# Math Operator Backend Service 🚀

Layanan backend berbasis **FastAPI** untuk kalkulasi rumus-rumus matematika pada proyek aplikasi portofolio kelompok.

---

## 🛠️ Fitur & Endpoint API

Seluruh endpoint menerima metode **POST** dengan format JSON dan mengembalikan hasil kalkulasi dalam satuan centimeter.

### 1. Luas Segitiga
* **Endpoint**: `/api/v1/calculate/triangle`
* **Request Body**:
  ```json
  {
    "alas": 10.0,
    "tinggi": 5.0
  }

  {
    "shape": "triangle",
    "area": 25.0
    }

    {
    "radius": 7.0,
    "tinggi": 10.0
    }

    {
    "shape": "cylinder",
    "volume": 1539.38
    }

    {
    "sisi": 4.0
    }

    {
    "shape": "square",
    "area": 16.0
    }

    {
    "radius": 7.0
    }

    {
    "shape": "circle",
    "area": 153.94
    }
