export default function NotificationLine() {
  return (
    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
      <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
      <div className="grid gap-1">
        <p className="text-sm font-medium">Your call has been confirmed.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">5 min ago</p>
      </div>
    </div>
  );
}
