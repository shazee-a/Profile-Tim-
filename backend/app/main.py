from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import math

app = FastAPI(title="Math Operator API")

# Izinkan CORS agar frontend Expo bisa mengakses API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schema Input
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

# 1. Endpoint Luas Segitiga (Zaky)
@app.post("/api/v1/calculate/triangle")
def calculate_triangle(data: TriangleInput):
    area = 0.5 * data.alas * data.tinggi
    return {"shape": "triangle", "area": round(area, 2)}

# 2. Endpoint Isi/Volume Tabung (Fadli)
@app.post("/api/v1/calculate/cylinder")
def calculate_cylinder(data: CylinderInput):
    volume = math.pi * (data.radius ** 2) * data.tinggi
    return {"shape": "cylinder", "volume": round(volume, 2)}

# 3. Endpoint Luas Kotak/Persegi (Zain)
@app.post("/api/v1/calculate/square")
def calculate_square(data: SquareInput):
    area = data.sisi * data.sisi
    return {"shape": "square", "area": round(area, 2)}

# 4. Endpoint Luas Lingkaran (Shaquilla)
@app.post("/api/v1/calculate/circle")
def calculate_circle(data: CircleInput):
    area = math.pi * (data.radius ** 2)
    return {"shape": "circle", "area": round(area, 2)}