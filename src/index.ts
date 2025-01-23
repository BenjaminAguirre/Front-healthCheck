import axios from "axios";
import { emailAccountBalance } from "./emailservice";



const CHECK_INTERVAL = 60000 * 10 * 6; // 5 minutos
let lastStatus = true; // Almacena el último estado del servidor

const healthCheck = async () => {
  try {
    const response = await axios.get("https://ongrid.run");

    if (response.status === 200) {
      console.log(`[${new Date().toISOString()}] Servidor operativo.`);
      if (!lastStatus) {
        // Si el servidor estaba caído antes, notifica que volvió a funcionar
        await emailAccountBalance("Servidor operativo", "El servidor está de vuelta en línea.");
        lastStatus = true;
      }
    } else {
      console.error(`[${new Date().toISOString()}] Problema detectado: ${response.status}`);
      if (lastStatus) {
        // Solo enviar correo si el estado ha cambiado
        await emailAccountBalance("Servidor caído", "El servidor está caído.");
        lastStatus = false;
      }
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error en el health check: ${error}`);
    if (lastStatus) {
      // Notifica solo una vez si el servidor cae
      await emailAccountBalance("Error de conexión", "No se pudo acceder al servidor.");
      lastStatus = false;
    }
  }
};

// Configurar el intervalo
setInterval(healthCheck, CHECK_INTERVAL);
