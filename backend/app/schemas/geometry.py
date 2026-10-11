from pydantic import BaseModel, Field


class RectangleInput(BaseModel):
    panjang: float = Field(..., gt=0, description="Panjang harus lebih dari 0")
    lebar: float = Field(..., gt=0, description="Lebar harus lebih dari 0")


class TriangleInput(BaseModel):
    alas: float = Field(..., gt=0, description="Alas harus lebih dari 0")
    tinggi: float = Field(..., gt=0, description="Tinggi harus lebih dari 0")


class CircleInput(BaseModel):
    radius: float = Field(..., gt=0, description="Jari-jari harus lebih dari 0")


class CalculationResult(BaseModel):
    shape: str
    area: float
    unit: str = "cm²"
