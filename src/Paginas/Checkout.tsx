import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import ValidaCupon from "../Components/Checkout/ValidaCupon";
import { useAuthStore } from "../store/authStore";

// Validación del formulario con Yup
const schema = yup.object().shape({
  nombreCompleto: yup
    .string()
    .required("El nombre completo es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres"),
  telefono: yup
    .string()
    .required("El número de teléfono es obligatorio")
    .matches(/^[0-9]{8}$/, "Debe ser un número válido de 8 dígitos"),
  email: yup
    .string()
    .required("El correo electrónico es obligatorio")
    .email("Debe ser un correo válido"),
  direccion: yup
    .string()
    .required("La dirección es obligatoria")
    .min(5, "Debe tener al menos 5 caracteres"),
});

type FormData = yup.InferType<typeof schema>;

export const Checkout: React.FC = () => {
  const navigate = useNavigate();

  const id = useAuthStore((state) => state.id);
  let userId = 6;
  if (id) {
    userId = parseInt(id);
  }
    
  const { productos, clearCart } = useCartStore();
  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const [totalConDescuento, setTotalConDescuento] = useState(total);
  const [cupon , setCupon] = useState("");


  // Estado método de pago y comprobante
  const [metodoPagoId, setMetodoPagoId] = useState("");
  const [comprobantePago, setComprobantePago] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // React Hook Form
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  if (productos.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Carrito Vacío</h2>
        <p className="text-gray-600">No tienes productos en tu carrito. Agrega algunos para proceder al checkout.</p>
      </div>
    );
  }

  // Aplicar descuento de cupón
  const onDescuentoAplicado = (descuento: number) => {
    setTotalConDescuento((prev) => prev - descuento);
  };

  // Manejo de archivo y miniatura
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten imágenes.");
      e.target.value = "";
      return;
    }

    setComprobantePago(file);
    setPreview(URL.createObjectURL(file));
  };

  // Envío del formulario
  const onSubmit = async (data: FormData) => {
    if (!metodoPagoId) return alert("Selecciona un método de pago");
    if (!comprobantePago) return alert("Debes subir el comprobante de pago");

    const detallesVenta = productos.map((p) => ({
      productoId: p.id,
      cantidad: p.cantidad,
      precioUnitario: p.precio,
      subtotal: p.precio * p.cantidad,
    }));

    try {
    
      const ventaForm = new FormData();
      ventaForm.append("usuarioId", userId.toString());
      ventaForm.append("nombreCompleto", data.nombreCompleto);
      ventaForm.append("telefono", data.telefono);
      ventaForm.append("email", data.email);
      ventaForm.append("direccion", data.direccion);
      ventaForm.append("total", totalConDescuento.toString()); // total con descuento aplicado
      ventaForm.append("metodoPagoId", metodoPagoId);
      ventaForm.append("comprobantePago", comprobantePago);
      ventaForm.append("detalleVenta", JSON.stringify(detallesVenta));
      ventaForm.append("estado", "En_Proceso");
      ventaForm.append("cupon", cupon);


      const formObj: any = {};
ventaForm.forEach((value, key) => {
  formObj[key] = value;
});

      const resVenta = await fetch("http://localhost:3000/api/ventas", {
        method: "POST",
        body: ventaForm,
      });

      console.log("Respuesta de la API:", resVenta);

      if (!resVenta.ok) throw new Error("Error al crear la venta");

      alert("Venta y detalle de venta guardados con éxito 🎉");

      clearCart();

      reset();

      setComprobantePago(null);
      setPreview(null);

      setTotalConDescuento(total);
      setMetodoPagoId("");
      navigate("/softwares");

    } catch (err: any) {
      alert(err.message || "Ocurrió un error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Izquierda: Datos del cliente + método de pago + comprobante */}
      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Datos de Envío</h2>

        <div>
          <label className="block text-gray-700 mb-1">Nombre Completo</label>
          <input {...register("nombreCompleto")} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.nombreCompleto && <p className="text-red-500 text-sm mt-1">{errors.nombreCompleto.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Número de Teléfono</label>
          <input type="tel" {...register("telefono")} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Correo Electrónico</label>
          <input type="email" {...register("email")} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Dirección</label>
          <textarea rows={3} {...register("direccion")} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Método de Pago</label>
          <select value={metodoPagoId} onChange={(e) => setMetodoPagoId(e.target.value)} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" required>
            <option value="">Seleccione un método</option>
            <option value="1">Tarjeta de Crédito</option>
            <option value="2">Transferencia Bancaria</option>
            <option value="3">Pago en Efectivo</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Subir Comprobante de Pago</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" required />
          {preview && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
              <img src={preview} alt="Comprobante" className="w-32 h-32 object-cover border rounded-md" />
            </div>
          )}
        </div>
      </div>

      {/* Derecha: Resumen de productos + cupón */}
      <div className="bg-gray-50 shadow-md rounded-2xl p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Resumen del Pedido</h2>

        <ul className="space-y-4 flex-1">
          {productos.map((p) => (
            <li key={p.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-semibold">{p.nombre}</p>
                <p className="text-sm text-gray-500">Cantidad: {p.cantidad}</p>
              </div>
              <span className="font-bold text-blue-600">Q{Number(p.precio) * p.cantidad}</span>
            </li>
          ))}
        </ul>

        <ValidaCupon onDescuento={onDescuentoAplicado} setCupon={setCupon} />

        <div className="mt-6 flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-blue-600">Q{totalConDescuento}</span>
        </div>
      </div>

      {/* Botón Finalizar Compra */}
      <div className="md:col-span-2 mt-8 flex justify-center">
          {
        !productos.length ? <p className="text-red-500 font-semibold">El carrito está vacío</p>
          
        :<button type="submit" className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition">
          Finalizar Compra / Pagar
        </button>
      } 
      </div>
    </form>
  );
};
