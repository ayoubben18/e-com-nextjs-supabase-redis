import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 p-6 dark:bg-gray-800 md:py-12">
      <div className="container grid max-w-7xl grid-cols-1 gap-8 text-sm sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col items-start gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <MountainIcon className="h-6 w-6" />
            <span>Acme Store</span>
          </Link>
          <p className="text-gray-500 dark:text-gray-400">
            Discover the best products for your home and lifestyle.
          </p>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Categories</h3>
          <Link href="#" className="hover:underline" prefetch={false}>
            Furniture
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Decor
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Lighting
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Kitchenware
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Outdoor
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Contact</h3>
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <MailIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span>support@acmestore.com</span>
          </div>
          <div className="flex items-center gap-2">
            <LocateIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span>123 Main St, Anytown USA</span>
          </div>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Legal</h3>
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Refund Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Shipping Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

function LocateIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function PhoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
