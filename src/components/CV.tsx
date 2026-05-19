import React from "react";

const CV: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4 print:bg-white print:p-0">
      {/* Print Button */}
      <div className="flex justify-center mb-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          In CV / Xuất PDF
        </button>
      </div>

      {/* CV Paper */}
      <div
        className="bg-white mx-auto shadow-2xl print:shadow-none"
        style={{
          maxWidth: "794px",
          width: "100%",
          fontFamily: "'Inter', 'Times New Roman', serif",
        }}
      >
        {/* ===== HEADER ===== */}
        <div
          className="relative"
          style={{
            background: "linear-gradient(135deg, #1a2744 0%, #2c3e6b 60%, #1a3a5c 100%)",
            padding: "36px 40px 28px",
          }}
        >
          {/* Decorative accent bar */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{ height: "5px", background: "linear-gradient(90deg, #c8a96e, #e8c98e, #c8a96e)" }}
          />

          <div className="flex items-center gap-8">
            {/* Avatar */}
            <div
              className="flex-shrink-0"
              style={{
                width: "120px",
                height: "140px",
                border: "4px solid #c8a96e",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src="/images/avatar.jpg"
                alt="Nguyễn Trung Hiếu"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>

            {/* Name & Info */}
            <div className="flex-1">
              <p
                style={{
                  color: "#c8a96e",
                  fontSize: "11px",
                  letterSpacing: "4px",
                  fontWeight: 600,
                  marginBottom: "6px",
                  textTransform: "uppercase",
                }}
              >
                Curriculum Vitae
              </p>
              <h1
                style={{
                  color: "#ffffff",
                  fontSize: "34px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  lineHeight: 1.1,
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Nguyễn Trung Hiếu
              </h1>
              <p
                style={{
                  color: "#c8a96e",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Kỹ Sư Xây Dựng · BIM Modeller
              </p>

              {/* Contact grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <ContactItem icon="📅" label="Ngày sinh" value="15/06/2001" />
                <ContactItem icon="✉️" label="Email" value="ntrhieu.hg@gmail.com" />
                <ContactItem icon="📞" label="Điện thoại" value="0787820981" />
                <ContactItem icon="📍" label="Địa chỉ" value="Tân Bình, Phụng Hiệp, Hậu Giang" />
              </div>
            </div>
          </div>
        </div>

        {/* ===== BODY ===== */}
        <div style={{ padding: "0 40px 40px" }}>
          {/* Personal Introduction */}
          <div
            style={{
              background: "linear-gradient(135deg, #f0f4ff 0%, #e8edf8 100%)",
              border: "1px solid #d0d8ef",
              borderLeft: "4px solid #2c3e6b",
              borderRadius: "0 6px 6px 0",
              padding: "16px 20px",
              margin: "24px 0",
            }}
          >
            <h3
              style={{
                color: "#1a2744",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Giới Thiệu Bản Thân
            </h3>
            <p style={{ color: "#374151", fontSize: "13px", lineHeight: "1.8", textAlign: "justify" }}>
              Em là kỹ sư xây dựng. Em đã làm việc với vị trí <strong>BIM Modeller</strong> 2 năm, đã triển khai các
              loại bản vẽ từ dự án nhỏ đến dự án lớn. Hầu hết các dự án em đã thực hiện đều sử dụng phần mềm{" "}
              <strong>Revit</strong>. Với kinh nghiệm triển khai bản vẽ, em tin rằng bản thân em hoàn toàn có thể thử
              sức với vai trò <strong>kỹ sư kiến trúc</strong>.
            </p>
          </div>

          {/* ===== EDUCATION ===== */}
          <Section title="Học Vấn" icon="🎓">
            <ExperienceBlock
              company="TRƯỜNG ĐẠI HỌC BÁCH KHOA – ĐẠI HỌC QUỐC GIA TP.HCM"
              period="08/2019 – 04/2024"
              subtitle="Chuyên ngành: Xây dựng dân dụng và công nghiệp"
              extra="GPA: 7.28/10"
              items={[]}
            />
          </Section>

          {/* ===== EXPERIENCE ===== */}
          <Section title="Kinh Nghiệm Làm Việc" icon="💼">
            <ExperienceBlock
              company="CÔNG TY CỔ PHẦN ĐỔI MỚI QUẢN LÝ CÔNG NGHỆ XÂY DỰNG – BIMTech JSC."
              period="05/2023 – 06/2024"
              subtitle="BIM Modeller"
              items={[
                {
                  project: "Khu đô thị Sycamore CapitaLand:",
                  detail:
                    "Triển khai bản vẽ thi công kết cấu và hoàn thiện cho phần cảnh quan. (Sử dụng Revit).",
                },
                {
                  project: "Chung cư Linh Dam:",
                  detail:
                    "Dựng mô hình BIM để bóc tách khối lượng và dự toán chi phí (Sử dụng Revit).",
                },
                {
                  project: "Mở rộng đường sắt Byford:",
                  detail:
                    "Triển khai bản vẽ thi công cho cấu kiện bê tông đổ tại chỗ (Beam stitch pour) để kết nối giữa hai cầu kiện dầm lắp ghép trên tuyến đường sắt (Sử dụng Revit) và kiểm tra xung đột (Sử dụng Navisworks).",
                },
                {
                  project: "Nhà máy sản xuất gỗ Bình Định:",
                  detail:
                    "Phát triển biện pháp thi công từ MS Project, Dựng mô hình BIM và triển khai bản vẽ biện pháp thi công (Sử dụng Revit).",
                },
                {
                  project: "Nhà máy sản xuất gạo Lộc Trời:",
                  detail:
                    "Dựng mô hình BIM (Sử dụng Revit) và dựng video đầu thầu (Sử dụng Unreal Engine).",
                },
              ]}
            />

            <ExperienceBlock
              company="PHÒNG MÔ PHỎNG THÔNG TIN CÔNG TRÌNH – TRƯỜNG ĐẠI HỌC BÁCH KHOA – ĐẠI HỌC QUỐC GIA TP.HCM · BIMLab."
              period="06/2022 – 08/2022"
              subtitle="Thực tập sinh · BIM Modeller (08/2022 – 05/2022)"
              items={[
                {
                  project: "Chung cư The Grand Manhattan:",
                  detail:
                    "Triển khai bản vẽ thi công cho phần hoàn thiện như: Xây tô, ốp lát, cán nền, sơn ngoài. (Sử dụng Revit).",
                },
                {
                  project: "Biệt thự Chateaeudkhanh:",
                  detail:
                    "Triển khai bản vẽ thi công kết cấu (sử dụng AutoCad và add-ins Katapro) và triển khai bản vẽ về biện pháp thi công (sử dụng Revit).",
                },
              ]}
            />
          </Section>

          {/* ===== SKILLS ===== */}
          <Section title="Kỹ Năng" icon="⚙️">
            <div className="mt-2">
              {/* Technical Skills */}
              <div className="mb-5">
                <h4
                  style={{
                    color: "#1a2744",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                    borderBottom: "1px dashed #c8a96e",
                    paddingBottom: "4px",
                  }}
                >
                  Kỹ Năng Chuyên Môn
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p style={{ color: "#4b5563", fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}>
                      Kỹ năng triển khai
                    </p>
                    <SkillBar label="Revit" percent={90} />
                    <SkillBar label="AutoCAD" percent={70} />
                  </div>
                  <div>
                    <p style={{ color: "#4b5563", fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}>
                      Kỹ năng thiết kế
                    </p>
                    <SkillBar label="RSAP" percent={70} />
                    <SkillBar label="Etab" percent={70} />
                  </div>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="mb-5">
                <h4
                  style={{
                    color: "#1a2744",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    borderBottom: "1px dashed #c8a96e",
                    paddingBottom: "4px",
                  }}
                >
                  Kỹ Năng Mềm
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Chịu trách nhiệm và nỗ lực trong công việc.",
                    "Có khả năng học hỏi và tiếp thu nhanh kiến thức mới.",
                    "Có khả năng làm việc nhóm và làm việc độc lập.",
                    "Có khả năng đảm nhiệm vai trò trưởng nhóm trong một nhóm.",
                  ].map((skill, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "5px" }}>
                      <span style={{ color: "#c8a96e", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>▸</span>
                      <span style={{ color: "#374151", fontSize: "13px", lineHeight: "1.6" }}>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certificates */}
              <div>
                <h4
                  style={{
                    color: "#1a2744",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    borderBottom: "1px dashed #c8a96e",
                    paddingBottom: "4px",
                  }}
                >
                  Chứng Chỉ
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Chứng chỉ Toeic Reading & Listening (635) tại IIG",
                    "Chứng chỉ Revit BIM 3D – Structure tại REACTEC",
                  ].map((cert, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "5px" }}>
                      <span style={{ color: "#c8a96e", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>▸</span>
                      <span style={{ color: "#374151", fontSize: "13px", lineHeight: "1.6" }}>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a2744 0%, #2c3e6b 100%)",
            padding: "14px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ height: "2px", flex: 1, background: "linear-gradient(90deg, transparent, #c8a96e)" }} />
          <p style={{ color: "#c8a96e", fontSize: "11px", letterSpacing: "2px", margin: "0 16px", whiteSpace: "nowrap" }}>
            NGUYỄN TRUNG HIẾU · KỸ SƯ XÂY DỰNG
          </p>
          <div style={{ height: "2px", flex: 1, background: "linear-gradient(90deg, #c8a96e, transparent)" }} />
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { margin: 0; }
          .print\\:hidden { display: none !important; }
          .print\\:bg-white { background: white !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:shadow-none { box-shadow: none !important; }
        }
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

/* ============================================================
   Sub-components
   ============================================================ */

const ContactItem: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <span style={{ fontSize: "13px" }}>{icon}</span>
    <div>
      <p style={{ color: "#9badd0", fontSize: "9px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", lineHeight: 1 }}>
        {label}
      </p>
      <p style={{ color: "#e8edf8", fontSize: "12px", fontWeight: 400, marginTop: "2px", lineHeight: 1.3 }}>{value}</p>
    </div>
  </div>
);

const Section: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div style={{ marginBottom: "28px" }}>
    {/* Section Header */}
    <div
      className="flex items-center gap-3"
      style={{ marginBottom: "16px" }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1a2744, #2c3e6b)",
          borderRadius: "4px",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <h2
        style={{
          color: "#1a2744",
          fontSize: "14px",
          fontWeight: 800,
          letterSpacing: "2px",
          textTransform: "uppercase",
          flex: 1,
        }}
      >
        {title}
      </h2>
      <div style={{ height: "2px", flex: 1, background: "linear-gradient(90deg, #2c3e6b, #c8a96e, transparent)" }} />
    </div>
    {children}
  </div>
);

interface ExperienceItem {
  project: string;
  detail: string;
}

const ExperienceBlock: React.FC<{
  company: string;
  period: string;
  subtitle: string;
  extra?: string;
  items: ExperienceItem[];
}> = ({ company, period, subtitle, extra, items }) => (
  <div
    style={{
      marginBottom: "20px",
      paddingLeft: "16px",
      borderLeft: "3px solid #c8a96e",
    }}
  >
    <div className="flex items-start justify-between gap-4" style={{ marginBottom: "4px" }}>
      <h3
        style={{
          color: "#1a2744",
          fontSize: "12.5px",
          fontWeight: 700,
          lineHeight: 1.4,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {company}
      </h3>
      <span
        style={{
          color: "#6b7280",
          fontSize: "11px",
          fontWeight: 500,
          whiteSpace: "nowrap",
          background: "#f3f4f6",
          padding: "2px 8px",
          borderRadius: "10px",
          flexShrink: 0,
        }}
      >
        {period}
      </span>
    </div>
    <p style={{ color: "#2c3e6b", fontSize: "12px", fontWeight: 600, fontStyle: "italic", marginBottom: "2px" }}>
      {subtitle}
    </p>
    {extra && (
      <p style={{ color: "#c8a96e", fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}>{extra}</p>
    )}

    {items.length > 0 && (
      <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0" }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              marginBottom: "7px",
              fontSize: "13px",
              color: "#374151",
              lineHeight: "1.65",
            }}
          >
            <span style={{ color: "#c8a96e", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>▸</span>
            <span>
              <strong style={{ color: "#1a2744" }}>{item.project}</strong> {item.detail}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const SkillBar: React.FC<{ label: string; percent: number }> = ({ label, percent }) => (
  <div style={{ marginBottom: "10px" }}>
    <div className="flex justify-between items-center" style={{ marginBottom: "4px" }}>
      <span style={{ color: "#374151", fontSize: "12px", fontWeight: 500 }}>{label}</span>
      <span style={{ color: "#c8a96e", fontSize: "11px", fontWeight: 700 }}>{percent}/10</span>
    </div>
    <div
      style={{
        height: "7px",
        background: "#e5e7eb",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${percent}%`,
          background: "linear-gradient(90deg, #1a2744, #c8a96e)",
          borderRadius: "10px",
          transition: "width 1s ease",
        }}
      />
    </div>
  </div>
);

export default CV;
