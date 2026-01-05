"use client"

export function AIContent() {
    return (
        <section id="ai" className="relative min-h-screen flex items-center py-20 overflow-hidden">
            {/* Grid Background Pattern */}
            <div
                className="absolute inset-0 opacity-[0.08] top-16 dark:opacity-[0.12]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, currentColor 1px, transparent 1px),
                        linear-gradient(to bottom, currentColor 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold font-heading">Soon!</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam quibusdam eligendi laboriosam accusamus consequatur quas provident asperiores repudiandae aperiam porro facere placeat explicabo omnis, modi cupiditate ad aut cum esse? Vel incidunt, quod nobis laboriosam ullam corporis mollitia porro aspernatur explicabo tenetur ducimus illo adipisci eos veniam rem autem?</p>
            </div>
        </section>
    )
}
