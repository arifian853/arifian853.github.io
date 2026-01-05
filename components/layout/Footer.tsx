

export const Footer = () => {
  return (
    <footer className="w-full h-16 mt-auto border-t border-border">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-center gap-2">
        <p className="text-sm text-center font-heading">
          Arifian S., {new Date().getFullYear()}. Made with{" "}
          <span className="text-primary font-medium">Next.js</span>
        </p>
      </div>
    </footer>
  )
}
