import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-stone-50 to-blue-50 py-10 px-4 font-['Be_Vietnam_Pro',sans-serif] print:py-0 print:px-0 print:bg-white">
      {/* Print Button */}
      <div className="flex justify-center mb-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-700 text-white rounded-full font-semibold shadow-lg hover:bg-blue-800 transition-all text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2m-6 0v4m-3-4h6" />
          </svg>
          In / Xuất PDF
        </button>
      </div>

      {/* CV Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">

        {/* ── HEADER ── */}
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white px-10 py-10">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-7">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src="/images/avatar.jpg"
                alt="Nguyễn Trung Hiếu"
                className="w-32 h-32 rounded-full object-cover border-4 border-white/80 shadow-xl"
              />
            </div>

            {/* Name & Info */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-blue-200 text-sm font-semibold tracking-[0.2em] uppercase mb-1">Curriculum Vitae</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide mb-4">NGUYỄN TRUNG HIẾU</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1.5 text-sm text-blue-100">
                <InfoItem icon="📅" label="Ngày sinh" value="15/06/2001" />
                <InfoItem icon="✉️" label="Email" value="ntrhieu.hg@gmail.com" />
                <InfoItem icon="📞" label="SĐT" value="0787820981" />
                <InfoItem icon="📍" label="Địa chỉ" value="Tân Bình, Phụng Hiệp, Hậu Giang" />
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-1 bg-slate-50 border-r border-slate-100 px-7 py-8 space-y-8">

            {/* Kỹ năng chuyên môn */}
            <Section title="KỸ NĂNG TRIỂN KHAI" accent="blue">
              <div className="space-y-3">
                <SkillBar label="Revit" value={90} color="bg-blue-600" />
                <SkillBar label="AutoCAD" value={70} color="bg-blue-500" />
              </div>
            </Section>

            <Section title="KỸ NĂNG THIẾT KẾ" accent="teal">
              <div className="space-y-3">
                <SkillBar label="RSAP" value={70} color="bg-teal-600" />
                <SkillBar label="Etab" value={70} color="bg-teal-500" />
              </div>
            </Section>

            {/* Kỹ năng mềm */}
            <Section title="KỸ NĂNG MỀM" accent="indigo">
              <ul className="space-y-2">
                {[
                  "Chịu trách nhiệm và nỗ lực trong công việc",
                  "Có khả năng học hỏi và tiếp thu nhanh kiến thức mới",
                  "Có khả năng làm việc nhóm và làm việc độc lập",
                  "Có khả năng đảm nhiệm vai trò trưởng nhóm trong một nhóm",
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1 text-indigo-500">✦</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Chứng chỉ */}
            <Section title="CHỨNG CHỈ" accent="amber">
              <ul className="space-y-2">
                {[
                  "Chứng chỉ Toeic Reading & Listening (635) tại IIG",
                  "Chứng chỉ Revit BIM 3D – Structure tại REACTEC",
                ].map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1 text-amber-500">🏅</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Sở thích */}
            <Section title="SỞ THÍCH" accent="rose">
              <div className="flex flex-wrap gap-2">
                {["BIM Technology", "Kiến trúc công trình", "Đọc sách kỹ thuật", "Nghiên cứu phần mềm mới"].map((h) => (
                  <span key={h} className="text-xs bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full font-medium">
                    {h}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 px-8 py-8 space-y-8">

            {/* Giới thiệu */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-r-xl px-5 py-4">
              <h2 className="text-xs font-bold text-blue-700 tracking-widest uppercase mb-2">Giới thiệu bản thân</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Em là kỹ sư xây dựng. Em đã làm việc với vị trí <strong className="text-blue-700">BIM Modeller</strong> 2 năm,
                đã triển khai và đã làm việc với từ dự án nhỏ đến dự án lớn. Hầu hết các dự án em đã thực hiện đều
                sử dụng phần mềm <strong className="text-blue-700">Revit</strong>. Với kinh nghiệm triển khai bản vẽ,
                em tin rằng bản thân em hoàn toàn có thể thử sức với vai trò hạ viên kiến trúc.
              </p>
            </div>

            {/* Học vấn */}
            <Section title="HỌC VẤN" accent="blue" icon="🎓">
              <div className="relative pl-5 border-l-2 border-blue-200">
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600" />
                <p className="text-sm font-bold text-blue-800 uppercase">
                  Trường Đại Học Bách Khoa – Đại Học Quốc Gia TP.HCM
                </p>
                <p className="text-xs text-slate-500 mt-0.5">08/2019 – 04/2024</p>
                <p className="text-sm text-slate-700 mt-1">Chuyên ngành: <strong>Xây dựng dân dụng và công nghiệp</strong></p>
                <p className="text-sm text-slate-700">GPA: <strong className="text-blue-700">7.28/10</strong></p>
              </div>
            </Section>

            {/* Kinh nghiệm */}
            <Section title="KINH NGHIỆM LÀM VIỆC" accent="indigo" icon="💼">
              <div className="space-y-6">

                {/* Job 1 */}
                <div>
                  <div className="bg-indigo-600 text-white rounded-lg px-4 py-2.5 mb-3">
                    <p className="font-bold text-sm uppercase tracking-wide">
                      Công Ty Cổ Phần Đổi Mới Quản Lý Công Nghệ Xây Dựng – BIMTech JSC.
                    </p>
                    <p className="text-indigo-200 text-xs mt-0.5">BIM Modeller (05/2023 – 06/2024)</p>
                  </div>
                  <p className="text-xs font-semibold text-indigo-700 mb-2 pl-1">▸ Khu đô thị Sycamore CapitaLand:</p>
                  <BulletItem>Triển khai bản vẽ thi công kết cấu và hoàn thiện cho phần cảnh quan. (Sử dụng Revit)</BulletItem>

                  <p className="text-xs font-semibold text-indigo-700 mt-2 mb-2 pl-1">▸ Chung cư Linh Dam:</p>
                  <BulletItem>Dựng mô hình BIM để bóc tách khối lượng và dự toán chi phí (Sử dụng Revit)</BulletItem>

                  <p className="text-xs font-semibold text-indigo-700 mt-2 mb-2 pl-1">▸ Mở rộng đường sắt Byford:</p>
                  <BulletItem>Triển khai bản vẽ thi công cho cầu kiến bê tông đổ tại chỗ (Beam stitch pour) để kết nối giữa hai cầu kiến dầm lắp ghép trên tuyến đường sắt (Sử dụng Revit) và kiểm tra xung đột (Sử dụng Navisworks)</BulletItem>

                  <p className="text-xs font-semibold text-indigo-700 mt-2 mb-2 pl-1">▸ Nhà máy sản xuất gỗ Bình Định:</p>
                  <BulletItem>Phát triển biện pháp thi công từ MS Project, Dựng mô hình BIM và triển khai bản vẽ biện pháp thi công (Sử dụng Revit)</BulletItem>

                  <p className="text-xs font-semibold text-indigo-700 mt-2 mb-2 pl-1">▸ Nhà máy sản xuất gạo Lộc Trời:</p>
                  <BulletItem>Dựng mô hình BIM (Sử dụng Revit và Unreal Engine) và dựng video đầu thầu (Sử dụng Unreal Engine)</BulletItem>
                </div>

                {/* Job 2 */}
                <div>
                  <div className="bg-teal-600 text-white rounded-lg px-4 py-2.5 mb-3">
                    <p className="font-bold text-sm uppercase tracking-wide leading-tight">
                      Phòng Mô Phỏng Thông Tin Công Trình – Trường ĐH Bách Khoa – ĐH QG TP.HCM – BIMLab.
                    </p>
                    <p className="text-teal-200 text-xs mt-0.5">
                      Thực tập sinh (06/2022 – 08/2022) &nbsp;|&nbsp; BIM Modeller (08/2022 – 05/2022)
                    </p>
                  </div>

                  <p className="text-xs font-semibold text-teal-700 mb-2 pl-1">▸ Chung cư The Grand Manhattan:</p>
                  <BulletItem>Triển khai bản vẽ thi công cho phần hoàn thiện như: Xây tô, ốp lát, cán nền, sơn ngoài. (Sử dụng Revit)</BulletItem>

                  <p className="text-xs font-semibold text-teal-700 mt-2 mb-2 pl-1">▸ Biệt thự Chateaeudkhanh:</p>
                  <BulletItem>Triển khai bản vẽ thi công kết cấu (sử dụng AutoCad và add-ins Katapro) và triển khai bản vẽ về biện pháp thi công (sử dụng Revit)</BulletItem>
                </div>
              </div>
            </Section>

          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white text-center py-3 text-xs tracking-widest font-light">
          © 2024 NGUYỄN TRUNG HIẾU &nbsp;·&nbsp; BIM MODELLER &nbsp;·&nbsp; KỸ SƯ XÂY DỰNG
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page { margin: 0.5cm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}

/* ─── Helper Components ─── */

function InfoItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base">{icon}</span>
      <span className="text-blue-300 font-medium">{label}:</span>
      <span className="text-white font-light">{value}</span>
    </div>
  );
}

function Section({
  title,
  accent,
  icon,
  children,
}: {
  title: string;
  accent: string;
  icon?: string;
  children: React.ReactNode;
}) {
  const colors: Record<string, string> = {
    blue: "text-blue-700 border-blue-500",
    teal: "text-teal-700 border-teal-500",
    indigo: "text-indigo-700 border-indigo-500",
    amber: "text-amber-700 border-amber-500",
    rose: "text-rose-700 border-rose-500",
  };
  return (
    <div>
      <div className={`flex items-center gap-2 border-b-2 pb-1.5 mb-4 ${colors[accent]}`}>
        {icon && <span className="text-lg">{icon}</span>}
        <h2 className="text-xs font-extrabold tracking-[0.18em] uppercase">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SkillBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-600 mb-1 font-medium">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-slate-600 pl-2">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}
