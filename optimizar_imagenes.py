import os
from PIL import Image

def optimize_new_images(directory="images", quality=82):
    if not os.path.exists(directory):
        print(f"Error: La carpeta '{directory}' no existe.")
        return

    # Extensiones de imagen soportadas para conversión
    input_extensions = ['.png', '.jpg', '.jpeg']
    
    # Buscar archivos de imagen de entrada
    files = [f for f in os.listdir(directory) if os.path.splitext(f)[1].lower() in input_extensions]
    
    if not files:
        print("No se encontraron nuevas imágenes PNG o JPG para optimizar.")
        print("Coloca tus nuevas fotos (ej. hero.jpg, massage.png, facial.jpg, bodycare.png, hotstone.jpg, logo.png) en la carpeta 'images' y vuelve a ejecutar este script.")
        return

    print("--- Optimizador de Imágenes a WebP ---")
    optimized_count = 0

    for filename in files:
        name_part, ext_part = os.path.splitext(filename)
        old_path = os.path.join(directory, filename)
        
        # El nombre del archivo WebP de salida
        new_filename = name_part.lower() + '.webp'
        new_path = os.path.join(directory, new_filename)

        try:
            old_size = os.path.getsize(old_path)
            
            with Image.open(old_path) as img:
                # Convertir a RGB si es necesario (ej. si es JPG no tiene transparencia)
                # WebP soporta RGBA perfectamente, así que mantenemos el modo original
                img.save(new_path, format="WEBP", quality=quality, method=6)
            
            new_size = os.path.getsize(new_path)
            saving = (old_size - new_size) / old_size * 100 if old_size > 0 else 0
            
            print(f"✓ Optimizado: {filename} ({old_size/1024:.1f} KB) -> {new_filename} ({new_size/1024:.1f} KB) | Ahorro: {saving:.1f}%")
            
            # Opcional: Eliminar la imagen original JPG/PNG para no duplicar archivos
            os.remove(old_path)
            print(f"  (Archivo original '{filename}' eliminado para mantener limpia la carpeta)")
            optimized_count += 1
            
        except Exception as e:
            print(f"✗ Error al procesar {filename}: {e}")

    print("\n--- Proceso Finalizado ---")
    print(f"Se optimizaron y reemplazaron {optimized_count} imágenes exitosamente.")
    print("¡Tu web ya está usando las nuevas fotos WebP de alta velocidad!")

if __name__ == "__main__":
    optimize_new_images()
