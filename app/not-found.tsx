import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-[var(--title-color)]">ไม่พบหน้าที่ต้องการ</h1>
      <p className="mt-3 text-[var(--body-text)]">ลิงก์อาจหมดอายุ หรือโพสต์ถูกลบแล้ว</p>
      <Link href="/" className="mt-8 inline-block font-semibold text-[var(--body-link)] hover:text-[var(--main-dark)]">
        กลับหน้าหลัก
      </Link>
    </div>
  );
}
