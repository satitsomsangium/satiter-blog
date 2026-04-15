import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900">ไม่พบหน้าที่ต้องการ</h1>
      <p className="mt-3 text-gray-600">ลิงก์อาจหมดอายุ หรือโพสต์ถูกลบแล้ว</p>
      <Link href="/" className="mt-8 inline-block font-semibold text-blue-600 transition-colors duration-150 ease-out hover:text-blue-700">
        กลับหน้าหลัก
      </Link>
    </div>
  );
}
