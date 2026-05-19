import { useMemo, useState } from "react";

type BmiCategory = {
  label: string;
  min: number;
  max: number;
  color: string;
};

const categories: BmiCategory[] = [
  { label: "Gay", min: 0, max: 18.5, color: "#2563eb" },
  { label: "Binh thuong", min: 18.5, max: 25, color: "#16a34a" },
  { label: "Thua can", min: 25, max: 30, color: "#d97706" },
  { label: "Beo phi", min: 30, max: Infinity, color: "#dc2626" },
];

function getBmiInfo(bmi: number) {
  return categories.find((item) => bmi >= item.min && bmi < item.max) ?? categories[0];
}

export default function App() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  const result = useMemo(() => {
    const weightNumber = Number(weight);
    const heightNumber = Number(height);

    if (!weightNumber || !heightNumber || weightNumber <= 0 || heightNumber <= 0) {
      return null;
    }

    const heightInMeter = heightNumber / 100;
    const bmi = weightNumber / (heightInMeter * heightInMeter);
    return {
      value: bmi,
      category: getBmiInfo(bmi),
    };
  }, [weight, height]);

  return (
    <main className="bmi-page">
      <section className="bmi-box" aria-labelledby="bmi-title">
        <h1 id="bmi-title">Phan mem tinh chi so BMI</h1>
        <p className="subtitle">Nhap can nang (kg) va chieu cao (cm) de tinh nhanh BMI cua ban.</p>

        <form className="bmi-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="weight">Can nang (kg)</label>
          <input
            id="weight"
            type="number"
            min="1"
            step="0.1"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="Vi du: 60"
          />

          <label htmlFor="height">Chieu cao (cm)</label>
          <input
            id="height"
            type="number"
            min="1"
            step="0.1"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            placeholder="Vi du: 170"
          />
        </form>

        <div className="result" aria-live="polite">
          {result ? (
            <>
              <p className="bmi-value">BMI: {result.value.toFixed(1)}</p>
              <p className="bmi-category" style={{ color: result.category.color }}>
                Phan loai: {result.category.label}
              </p>
            </>
          ) : (
            <p className="placeholder">Vui long nhap day du thong tin hop le.</p>
          )}
        </div>
      </section>
    </main>
  );
}
