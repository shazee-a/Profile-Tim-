import math


class AreaCalculatorService:

    @staticmethod
    def calculate_rectangle(panjang: float, lebar: float) -> float:
        return panjang * lebar

    @staticmethod
    def calculate_triangle(alas: float, tinggi: float) -> float:
        return 0.5 * alas * tinggi

    @staticmethod
    def calculate_circle(radius: float) -> float:
        return math.pi * (radius**2)
