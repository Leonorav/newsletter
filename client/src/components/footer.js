function Footer() {
    return (
        <>
            <footer
                className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-4  dark:bg-zinc-300 absolute bottom-0 w-full">
    <span className="text-sm font-semibold text-black sm:text-center dark:text-black">© 2023  Emil Löffelhardt GmbH & Co. KG.
    </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-700 dark:text-gray-700 sm:mt-0">
                    <li>
                        <a href="https://www.loeffelhardt.de/" className="mr-4 hover:underline md:mr-6"
                           target="_blank">Homepage</a>
                    </li>
                    <li>
                        <a href="https://www.loeffelhardt.de/hilfe/" className="mr-4 hover:underline md:mr-6"
                           target="_blank">Fernwartung</a>
                    </li>
                    <li>
                        <a href="https://www.loeffelhardt.de/agb.html" className="mr-4 hover:underline md:mr-6"
                           target="_blank">AGB</a>
                    </li>
                    <li>
                        <a href="https://www.loeffelhardt.de/datenschutz.html" className="mr-4 hover:underline md:mr-6"
                           target="_blank">Datenschutz</a>
                    </li>
                    <li>
                        <a href="https://www.loeffelhardt.de/impressum/" className="mr-4 hover:underline md:mr-6"
                           target="_blank">Impressum</a>
                    </li>
                </ul>
            </footer>

        </>
    );
}

export default Footer;
