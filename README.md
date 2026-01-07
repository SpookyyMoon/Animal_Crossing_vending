# Animal Crossing Vending Machine

Animal Crossing Vending es un sistema interactivo de gestión de máquinas expendedoras inspirado en el universo de Nintendo. Combina una interfaz de usuario diseñada para encajar en el mundo de Animal Crossing con lógica de administración para el control de inventario y recaudación, conectada a una base de datos en mongo mediante una API REST.

## Características principales:

- Interfaz Temática Interactiva – Experiencia de usuario inmersiva inspirada en Animal Crossing, que incluye bocadillos de diálogo dinámicos y un sintetizador de voz (Animalese) para la comunicación del sistema.

- Selección y Validación de Productos – Sistema de teclado numérico para la selección de artículos con validación en tiempo real de códigos de producto y disponibilidad de stock en la base de datos.

- Gestión de Crédito y Pagos – Ingreso de efectivo que acepta múltiples denominaciones (monedas y billetes), controlando el crédito insertado y permitiendo la devolución del mismo en cualquier momento.

- Algoritmo de Cambio Inteligente – Lógica avanzada para el cálculo de devoluciones que prioriza el uso de monedas disponibles en la caja y garantiza que el sistema no procese ventas si no puede entregar el cambio exacto.

- Panel de Administración Multitarea – Entorno restringido para la gestión operativa que permite tres ejes de control: actualización de inventario, ajuste de precios y arqueo de caja.

- Control de Stock con Límites Físicos – Validación lógica de existencias que impide sobrepasar la capacidad máxima de la máquina (15 unidades por ranura), asegurando la integridad de los datos del inventario.

- Gestión Automatizada de Beneficios – Función de retirada de caja que calcula automáticamente las ganancias, permitiendo extraer billetes y excedentes mientras mantiene un fondo de maniobra optimizado en monedas de baja denominación.

- Sincronización mediante API REST – Arquitectura cliente-servidor donde todas las operaciones de venta, reposición y recaudación se sincronizan mediante peticiones HTTP (GET, PUT) con un backend en Express.

- Validación de Formularios y Acciones – Control estricto de la interfaz que deshabilita interacciones durante el procesamiento de pedidos y valida las entradas numéricas para evitar errores de tipo o desbordamientos.


---

## Diseño en figma:

[https://www.figma.com/design/9dLPDXMIL2y7yJOScwnj3y/OishiSushi?node-id=0-1&t=E6AiOLfoNC8NQhxM-1](https://www.figma.com/design/AoGeVDM257a4W1KghftBBy/MaquinaExpendedora?node-id=0-1&t=EF4l3HuOjXQ8Z5o9-1)

---

## Tecnologías utilizadas:

- **Lenguaje principal:** JavaScript
- **Interfaz gráfica:** HTML + CSS
- **Comunicación con backend:** API Fetch
- **Backend:** Node.js + Express + MongoDB Atlas (API REST)  
- **Gestión de datos:**  MongoDB Atlas
  
---

## Imágenes en ejecución:

### Vista de inicio
<img width="2558" height="1362" alt="{55E2F673-A8B3-4BDD-91E9-6472D2B89B17}" src="https://github.com/user-attachments/assets/4f1083b1-727e-46ca-848c-74ab10fab999" />

### Panel de ingreso en efectivo
<img width="2558" height="1341" alt="{AE7F0EA8-DFB0-4141-8889-F85A0628495A}" src="https://github.com/user-attachments/assets/4ae8fdf6-540a-48fb-9cac-1f097988f01a" />

### Panel administrativo
<img width="2554" height="1338" alt="{56FE8BEC-604F-420C-8B47-D59D2950A7C3}" src="https://github.com/user-attachments/assets/97a082fc-1139-479a-8b52-fe34d2e54bc4" />


### Sección de retiradas
<img width="2559" height="1340" alt="{93E08FD7-7D13-4A5B-BEF9-49A4791CBAF0}" src="https://github.com/user-attachments/assets/9aacefd5-40f2-4ac8-8dfd-31531ed71721" />

### Dialogos interactivos
<img width="2558" height="1333" alt="{D98E3689-D0C9-4E2A-BCD2-F0D6E222B654}" src="https://github.com/user-attachments/assets/9055c130-83cc-4f3a-a8e4-678f244b4e42" />
