const Footer = () => {
  return (
    <footer className="bg-[var(--vinotinto)] text-gray-300 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; Elaborado por Juan De Abreu</p>
        <div className="flex items-center space-x-6">
          {/* Gmail */}
          <a
            href="mailto:juan.abreu.2005@gmail.com"
            className="flex items-center space-x-2 hover:text-white transition"
            aria-label="Enviar correo a Juan Abreu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 6.99L20 8v10H4z" />
            </svg>
            <span className="text-sm">juan.abreu.2005@gmail.com</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ing-juan-de-abreu/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-white transition"
            aria-label="Perfil LinkedIn de Juan Abreu"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 1.11 1 2.5 1 4.98 2.12 4.98 3.5zM0 7h5v14H0V7zm7 0h4.67v1.77h.07c.65-1.23 2.23-2.53 4.6-2.53 4.92 0 5.83 3.24 5.83 7.46V21h-4.99v-6.38c0-1.52-.03-3.48-2.12-3.48-2.12 0-2.44 1.65-2.44 3.36V21H7V7z" />
            </svg>
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
