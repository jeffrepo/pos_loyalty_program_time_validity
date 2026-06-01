# POS Loyalty Program Time Validity

Módulo para Odoo 19 que agrega ventana diaria de horario a `loyalty.program` y valida promociones en POS.

## Qué agrega

- `hour_from`: hora inicio de la promoción.
- `hour_to`: hora fin de la promoción.
- Widget `float_time` en la vista del programa.
- Carga de ambos campos al frontend del POS.
- Validación combinada de fecha y hora en:
  - Programas automáticos / aplicabilidad general del POS.
  - Códigos promocionales ingresados manualmente.

## Regla de validez

- `date_from` y `date_to` mantienen el rango de fechas existente.
- `hour_from` y `hour_to` agregan el rango diario en formato 24 horas.
- Se soportan horarios que cruzan medianoche, por ejemplo `22:00` a `02:00`.

## Instalación

1. Copiar la carpeta `pos_loyalty_program_time_validity` en el addons path.
2. Actualizar lista de aplicaciones.
3. Instalar el módulo.
4. Cerrar y volver a abrir la sesión POS para recargar assets y modelos.

## Nota

Si en tu base el XML ID de la vista principal de `loyalty.program` cambió, ajusta el `inherit_id` en `views/loyalty_program_views.xml`.
