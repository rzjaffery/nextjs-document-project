// Inside app/comic-vault/components/navbar.tsx

import Link from 'next/link';

export function Navbar() {
    return (
        <nav>
            <Link href="/comic-vault" className="text-xl font-bold">
                Comic Vault
            </Link>
        </nav>
    );
}