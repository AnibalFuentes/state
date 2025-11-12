# 🎵 Reproductor de Música - Patrón State

## 📋 Descripción del Proyecto

Este proyecto es una implementación práctica del **Patrón de Diseño State** utilizando **Next.js 14**, **TypeScript** y **Tailwind CSS**. El objetivo es demostrar cómo este patrón elimina condicionales complejos y mejora la mantenibilidad del código al encapsular el comportamiento específico de cada estado en clases separadas.

---

## 🎯 Contexto del Problema

### **Problema a Resolver**

Imagina que estás desarrollando un reproductor de música. Este reproductor puede estar en diferentes estados:

- **Detenido** (Stopped)
- **Reproduciendo** (Playing)
- **Pausado** (Paused)

Cada estado tiene comportamientos diferentes cuando el usuario interactúa con los controles:

| Estado            | Acción PLAY              | Acción PAUSE       | Acción STOP         |
| ----------------- | ------------------------ | ------------------ | ------------------- |
| **Detenido**      | ✅ Inicia reproducción   | ❌ No válido       | ❌ Ya está detenido |
| **Reproduciendo** | ❌ Ya está reproduciendo | ✅ Pausa           | ✅ Detiene          |
| **Pausado**       | ✅ Continúa reproducción | ❌ Ya está pausado | ✅ Detiene          |

### **Solución Tradicional (Problemática)**

```typescript
class MusicPlayer {
  private status: string = "stopped";

  play() {
    if (this.status === "stopped") {
      this.status = "playing";
      return "Reproduciendo...";
    } else if (this.status === "playing") {
      return "Ya está reproduciendo";
    } else if (this.status === "paused") {
      this.status = "playing";
      return "Continuando...";
    }
  }

  pause() {
    if (this.status === "stopped") {
      return "No se puede pausar";
    } else if (this.status === "playing") {
      this.status = "paused";
      return "Pausado";
    } else if (this.status === "paused") {
      return "Ya está pausado";
    }
  }

  stop() {
    // Más if/else...
  }
}
```

**Problemas de este enfoque:**

- 🔴 **Código espagueti**: Múltiples `if/else` anidados
- 🔴 **Difícil de mantener**: Agregar un nuevo estado requiere modificar todas las funciones
- 🔴 **Viola el principio Open/Closed**: No abierto a extensión, requiere modificación
- 🔴 **Difícil de testear**: Muchas ramas condicionales
- 🔴 **Código duplicado**: Validaciones repetidas en cada método

---

## ✨ Solución con Patrón State

El **Patrón State** resuelve estos problemas encapsulando cada estado en una clase separada:

```typescript
// Cada estado sabe qué hacer
class StoppedState implements PlayerState {
  play(context) {
    context.setState(new PlayingState());
    return "▶️ Reproduciendo...";
  }
  pause(context) {
    return "⚠️ No se puede pausar";
  }
}

class PlayingState implements PlayerState {
  play(context) {
    return "⚠️ Ya está reproduciendo";
  }
  pause(context) {
    context.setState(new PausedState());
    return "⏸️ Pausado";
  }
}
```

**Ventajas:**

- ✅ **Cero condicionales**: Cada clase encapsula su comportamiento
- ✅ **Fácil de extender**: Agregar un nuevo estado no afecta los existentes
- ✅ **Cumple SOLID**: Open/Closed, Single Responsibility
- ✅ **Código limpio**: Fácil de leer y entender
- ✅ **Testeable**: Cada estado se prueba independientemente

---

## 🏗️ Arquitectura del Proyecto

```
src/
├── types/                          # Interfaces y contratos
│   └── PlayerState.interface.ts    # Define el contrato de estados
│
├── states/                         # Estados concretos del patrón
│   ├── StoppedState.ts            # Estado: Detenido
│   ├── PlayingState.ts            # Estado: Reproduciendo
│   └── PausedState.ts             # Estado: Pausado
│
├── context/                        # Lógica del contexto
│   └── MusicPlayer.ts             # Orquestador principal
│
├── constants/                      # Constantes y configuración
│   └── tracks.ts                  # Lista de canciones
│
├── hooks/                          # Custom hooks de React
│   └── useMusicPlayer.ts          # Lógica de React para el reproductor
│
├── components/                     # Componentes de UI
│   ├── PlayerDisplay.tsx          # Visualización del estado
│   ├── PlayerControls.tsx         # Botones de control
│   ├── TrackSelector.tsx          # Selector de canciones
│   └── ActionLog.tsx              # Registro de acciones
│
└── app/
    └── page.tsx                   # Página principal
```

---

## 🎨 Diagrama de Estados

```
          ┌─────────────┐
          │   Stopped   │
          └─────────────┘
                 │
            play()│
                 ▼
          ┌─────────────┐
    ┌────▶│   Playing   │◀────┐
    │     └─────────────┘     │
    │            │             │
play()      pause()│       play()
    │            ▼             │
    │     ┌─────────────┐     │
    └─────│   Paused    │─────┘
          └─────────────┘
                 │
            stop()│
                 ▼
          ┌─────────────┐
          │   Stopped   │
          └─────────────┘
```

---

## 🚀 Instalación y Uso

### **Prerrequisitos**

- Node.js 18.0 o superior
- npm o yarn

### **Instalación**

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/music-player-state-pattern.git

# Entrar al directorio
cd music-player-state-pattern

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### **Scripts Disponibles**

```bash
npm run dev      # Modo desarrollo
npm run build    # Compilar para producción
npm run start    # Ejecutar en producción
npm run lint     # Verificar código
```

---

## 🧪 Ejemplo de Uso

```typescript
import { MusicPlayer } from "./context/MusicPlayer";

// Crear instancia del reproductor
const player = new MusicPlayer("Bohemian Rhapsody - Queen");

// Estado inicial: Detenido
console.log(player.getStatus()); // "Detenido"

// Reproducir
console.log(player.play()); // "▶️ Reproduciendo: Bohemian Rhapsody - Queen"
console.log(player.getStatus()); // "Reproduciendo"

// Pausar
console.log(player.pause()); // "⏸️ Pausado: Bohemian Rhapsody - Queen"
console.log(player.getStatus()); // "Pausado"

// Intentar pausar de nuevo (acción inválida)
console.log(player.pause()); // "⚠️ Ya está en pausa."

// Detener
console.log(player.stop()); // "⏹️ Detenido: Bohemian Rhapsody - Queen"
```

---

## 📚 Conceptos Clave del Patrón State

### **1. PlayerState (Interface)**

Define el contrato que todos los estados deben cumplir.

```typescript
interface PlayerState {
  play(context: MusicPlayerContext): string;
  pause(context: MusicPlayerContext): string;
  stop(context: MusicPlayerContext): string;
  getStateName(): string;
  getColor(): string;
}
```

### **2. Estados Concretos**

Cada estado implementa la interfaz con su comportamiento específico:

- `StoppedState`: Solo permite reproducir
- `PlayingState`: Permite pausar o detener
- `PausedState`: Permite continuar o detener

### **3. Contexto (MusicPlayer)**

Mantiene referencia al estado actual y delega las acciones:

```typescript
class MusicPlayer implements MusicPlayerContext {
  private state: PlayerState;

  play(): string {
    return this.state.play(this); // Delega al estado
  }
}
```

---

## 🎓 Principios SOLID Aplicados

### **Single Responsibility Principle (SRP)**

- Cada estado tiene una sola responsabilidad: gestionar su comportamiento específico

### **Open/Closed Principle (OCP)**

- Abierto a extensión: Puedes agregar nuevos estados sin modificar los existentes
- Cerrado a modificación: No necesitas cambiar el código existente

### **Liskov Substitution Principle (LSP)**

- Todos los estados implementan la misma interfaz y son intercambiables

### **Dependency Inversion Principle (DIP)**

- El contexto depende de abstracciones (PlayerState), no de implementaciones concretas

---

## 🔧 Tecnologías Utilizadas

| Tecnología       | Versión | Propósito               |
| ---------------- | ------- | ----------------------- |
| **Next.js**      | 14.x    | Framework React con SSR |
| **TypeScript**   | 5.x     | Tipado estático         |
| **React**        | 18.x    | Librería UI             |
| **Tailwind CSS** | 3.x     | Estilos utility-first   |
| **Lucide React** | latest  | Iconos                  |

---

## 📖 Recursos Adicionales

### **Documentación**

- [Patrón State - Refactoring Guru](https://refactoring.guru/design-patterns/state)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### **Conceptos Relacionados**

- **Strategy Pattern**: Similar al State, pero sin transiciones automáticas
- **Finite State Machine (FSM)**: Concepto matemático detrás del patrón
- **Command Pattern**: Encapsula acciones como objetos

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🌟 Conclusión

Este proyecto demuestra cómo el **Patrón State** puede transformar código complejo lleno de condicionales en una solución elegante, mantenible y escalable. Al encapsular el comportamiento específico de cada estado en clases separadas, logramos:

✅ Código más limpio y legible  
✅ Mejor mantenibilidad  
✅ Facilidad para agregar nuevos estados  
✅ Cumplimiento de principios SOLID  
✅ Mayor testabilidad

**¿Cuándo usar el Patrón State?**

- Cuando un objeto tiene múltiples estados con comportamientos diferentes
- Cuando tienes muchos `if/else` o `switch` basados en el estado
- Cuando el comportamiento de un objeto cambia dinámicamente

---

⭐ **Si te gustó este proyecto, no olvides darle una estrella en GitHub!**
