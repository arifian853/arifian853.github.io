/**
 * convert-to-avif.mjs
 * Converts all .avif files in /public that are actually WebP content into real AVIF.
 * Uses sharp (already installed by Next.js).
 *
 * Run: node convert-to-avif.mjs
 */

import sharp from "sharp"
import { readdir, stat } from "fs/promises"
import { join, extname, basename } from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PUBLIC_DIR = join(__dirname, "public")

// Recursively collect all .avif files
async function collectFiles(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    const files = []
    for (const entry of entries) {
        const fullPath = join(dir, entry.name)
        if (entry.isDirectory()) {
            files.push(...(await collectFiles(fullPath)))
        } else if (extname(entry.name).toLowerCase() === ".avif") {
            files.push(fullPath)
        }
    }
    return files
}

async function convert() {
    const files = await collectFiles(PUBLIC_DIR)

    if (files.length === 0) {
        console.log("No .avif files found in /public")
        return
    }

    // Output dir mirrors the public structure under public/avif-output/
    const OUTPUT_DIR = join(PUBLIC_DIR, "avif-output")
    const { mkdir } = await import("fs/promises")
    await mkdir(join(OUTPUT_DIR, "projects"), { recursive: true })

    console.log(`Found ${files.length} file(s) to convert:`)
    console.log(`Output → ${OUTPUT_DIR}\n`)

    let success = 0
    let skipped = 0
    let failed = 0

    for (const filePath of files) {
        const name = basename(filePath)
        // Preserve subfolder structure
        const relativePath = filePath.replace(PUBLIC_DIR, "")
        const outPath = join(OUTPUT_DIR, relativePath)

        try {
            const meta = await sharp(filePath).metadata()
            const beforeSize = (await stat(filePath)).size

            if (meta.format === "avif") {
                console.log(`  ⏭  ${name} — already AVIF, skipping`)
                skipped++
                continue
            }

            await sharp(filePath)
                .avif({
                    quality: 75,
                    effort: 6,
                    chromaSubsampling: "4:2:0",
                })
                .toFile(outPath)

            const afterSize = (await stat(outPath)).size
            const saved = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1)
            console.log(`  ✓  ${name} (${meta.format} → avif) | ${(beforeSize / 1024).toFixed(1)} KB → ${(afterSize / 1024).toFixed(1)} KB  (-${saved}%)`)
            success++
        } catch (err) {
            console.error(`  ✗  ${name} — FAILED: ${err.message}`)
            failed++
        }
    }

    console.log(`\n─────────────────────────────────────────────────`)
    console.log(`  ✓ Converted : ${success}`)
    console.log(`  ⏭ Skipped   : ${skipped}`)
    console.log(`  ✗ Failed    : ${failed}`)
    console.log(`─────────────────────────────────────────────────`)
    if (success > 0) {
        console.log(`\nDone! Converted files are in: public/avif-output/`)
        console.log(`Stop the dev server, then run:`)
        console.log(`  Copy-Item public\\avif-output\\* public\\ -Recurse -Force`)
        console.log(`  Remove-Item public\\avif-output -Recurse`)
    }
}

convert().catch(console.error)
