import base64
import io
import math
from typing import Dict, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

app = FastAPI(title="Math Operator & Quiz API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== SCHEMAS ====================
class TriangleInput(BaseModel):
    alas: float
    tinggi: float

class CylinderInput(BaseModel):
    radius: float
    tinggi: float

class SquareInput(BaseModel):
    sisi: float

class CircleInput(BaseModel):
    radius: float

class VoteInput(BaseModel):
    olahraga: List[str]

class JawabanUser(BaseModel):
    soal_id: int
    pilihan_user: List[int]

# ==================== DATABASE INITIALIZATION (MULAI DARI 0 VOTE) ====================
polling_db: Dict[str, int] = {
    "Badminton": 0,
    "Catur": 0,
    "Padel": 0,
    "Basket": 0,
    "Lari Marathon": 0
}

COLOR_MAP = {
    "Badminton": '#FF1236',
    "Catur": '#3B82F6',
    "Padel": '#10B981',
    "Basket": '#F59E0B',
    "Lari Marathon": '#8B5CF6'
}

SOAL_DATABASE = [
    {
        "id": 1,
        "tipe": "single",
        "pertanyaan": "Berapakah luas segitiga jika alasnya 10 cm dan tingginya 12 cm?",
        "pilihan": ["120 cm²", "60 cm²", "30 cm²", "50 cm²", "24 cm²"],
        "jawaban_benar": [1],
        "penjelasan": "Luas Segitiga = ½ × alas × tinggi = ½ × 10 × 12 = 60 cm²."
    },
    {
        "id": 2,
        "tipe": "single",
        "pertanyaan": "Berapakah volume tabung jika jari-jari (r) 7 cm dan tinggi (t) 10 cm? (π = 22/7)",
        "pilihan": ["1540 cm³", "154 cm³", "770 cm³", "440 cm³", "220 cm³"],
        "jawaban_benar": [0],
        "penjelasan": "Volume Tabung = π × r² × t = (22/7) × 7² × 10 = 1540 cm³."
    },
    {
        "id": 3,
        "tipe": "multiple",
        "pertanyaan": "Pilihlah SEMUA rumus matematika yang BENAR di bawah ini:",
        "pilihan": [
            "Luas Lingkaran = π × r²",
            "Luas Persegi = sisi × sisi",
            "Luas Segitiga = alas × tinggi",
            "Keliling Persegi = 4 × sisi",
            "Volume Tabung = ½ × π × r × t"
        ],
        "jawaban_benar": [0, 1, 3],
        "penjelasan": "Rumus yang benar adalah Luas Lingkaran (πr²), Luas Persegi (s²), dan Keliling Persegi (4s)."
    },
    {
        "id": 4,
        "tipe": "single",
        "pertanyaan": "Sebuah persegi memiliki luas 81 cm². Berapakah panjang sisinya?",
        "pilihan": ["7 cm", "8 cm", "9 cm", "10 cm", "81 cm"],
        "jawaban_benar": [2],
        "penjelasan": "Panjang sisi = √Luas = √81 = 9 cm."
    },
    {
        "id": 5,
        "tipe": "multiple",
        "pertanyaan": "Mana saja sifat-sifat yang dimiliki oleh bangun datar Lingkaran?",
        "pilihan": [
            "Memiliki simetri lipat tak terhingga",
            "Memiliki 4 titik sudut siku-siku",
            "Memiliki 1 titik pusat",
            "Jumlah sudut dalamnya 360°",
            "Memiliki 2 diagonal yang saling tegak lurus"
        ],
        "jawaban_benar": [0, 2, 3],
        "penjelasan": "Lingkaran memiliki simetri lipat tak hingga, 1 titik pusat, dan sudut penuh 360°."
    }
]

# ==================== HELPER GENERATE PIE CHART HANYA UNTUK VOTE > 0 ====================
def generate_pie_chart_base64() -> str:
    active_items = {k: v for k, v in polling_db.items() if v > 0}
    
    if not active_items:
        return ""

    labels = list(active_items.keys())
    values = list(active_items.values())
    colors = [COLOR_MAP[label] for label in labels]

    fig, ax = plt.subplots(figsize=(5, 4.5), facecolor='none')
    
    # Pie Chart Full Lingkaran Murni (Tanpa width/donut)
    wedges, texts, autotexts = ax.pie(
        values, 
        labels=labels, 
        autopct='%1.1f%%',
        startangle=140,
        colors=colors,
        wedgeprops=dict(edgecolor='white', linewidth=1.5)
    )
    
    for t in texts:
        t.set_color('#111827')  # Teks label gelap tajam
        t.set_fontsize(9)
        t.set_fontweight('bold')
    for at in autotexts:
        at.set_color('#ffffff')  # Angka persentase putih di dalam pie
        at.set_fontsize(9)
        at.set_fontweight('bold')

    ax.set_title("Hasil Polling Olahraga (Real-Time)", color='#111827', fontsize=12, fontweight='bold', pad=15)
    plt.tight_layout()

    buf = io.BytesIO()
    plt.savefig(buf, format='png', transparent=True, dpi=130)
    plt.close(fig)
    buf.seek(0)
    
    encoded = base64.b64encode(buf.read()).decode('utf-8')
    return f"data:image/png;base64,{encoded}"

# ==================== ENDPOINTS KALKULATOR ====================
@app.post("/api/v1/calculate/triangle")
def calculate_triangle(data: TriangleInput):
    return {"shape": "triangle", "area": round(0.5 * data.alas * data.tinggi, 2)}

@app.post("/api/v1/calculate/cylinder")
def calculate_cylinder(data: CylinderInput):
    return {"shape": "cylinder", "volume": round(math.pi * (data.radius ** 2) * data.tinggi, 2)}

@app.post("/api/v1/calculate/square")
def calculate_square(data: SquareInput):
    return {"shape": "square", "area": round(data.sisi * data.sisi, 2)}

@app.post("/api/v1/calculate/circle")
def calculate_circle(data: CircleInput):
    return {"shape": "circle", "area": round(math.pi * (data.radius ** 2), 2)}

# ==================== ENDPOINTS KUESIONER & POLLING ====================
@app.get("/api/v1/questionnaire/questions")
def get_questions():
    questions_data = []
    for q in SOAL_DATABASE:
        item = q.copy()
        item.pop("jawaban_benar", None)
        item.pop("penjelasan", None)
        questions_data.append(item)
    return {"questions": questions_data}

@app.post("/api/v1/questionnaire/verify")
def verify_answer(user_ans: JawabanUser):
    soal = next((q for q in SOAL_DATABASE if q["id"] == user_ans.soal_id), None)
    if not soal:
        raise HTTPException(status_code=404, detail="Soal tidak ditemukan")

    is_correct = set(soal["jawaban_benar"]) == set(user_ans.pilihan_user)
    return {
        "soal_id": soal["id"],
        "is_correct": is_correct,
        "jawaban_benar_index": soal["jawaban_benar"],
        "penjelasan": soal["penjelasan"]
    }

@app.get("/api/v1/polling/chart")
def get_polling_chart():
    return {"votes": polling_db, "chart_image": generate_pie_chart_base64()}

@app.post("/api/v1/polling/vote")
def submit_vote(vote: VoteInput):
    for item in vote.olahraga:
        if item in polling_db:
            polling_db[item] += 1
    return {"message": "Vote berhasil", "votes": polling_db, "chart_image": generate_pie_chart_base64()}