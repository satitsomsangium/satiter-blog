/**
 * พื้นที่แสดงโฆษณาใน sidebar — ใส่โค้ด AdSense / แบนเนอร์ใน children หรือแทนที่คอมโพเนนต์นี้
 */
export function SidebarAdSlot() {
  return (
    <div className="sidebar-ad-slot" aria-label="พื้นที่โฆษณา">
      <span className="sidebar-ad-slot-label">Ads</span>
    </div>
  );
}
