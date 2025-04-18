<template>
    <div id="app">
        <div id="campo">
            <canvas
                id="tacticaCanvas"
                width="1000"
                height="500"
                @mousedown="handleMouseDown"
                @mouseup="stopDragging"
                @mousemove="moveElemento"
                @click="handleCanvasClick"
            ></canvas>
        </div>
        <div id="panel">
            <div class="tactica-controls">
                <button class="button-tactica" @click="activarAgregarFlecha">Agregar Flecha</button>
                <button class="button-tactica" @click="quitarFlecha">Borrar Flecha</button>
                <input v-model="nombreTactica" placeholder="Nombre táctica" class="tactica-input">
                <button class="button-tactica" @click="guardarTactica">Guardar Táctica</button>
            </div>
            <div class="tactica-list">
                <h3>Mis Tácticas Guardadas</h3>
                <ul>
                    <li v-for="(tactica, index) in tacticasGuardadas" :key="index">
                        {{ tactica.nombre }}
                        <button @click="cargarTactica(index)" class="small-button">Cargar</button>
                        <button @click="eliminarTactica(index)" class="small-button delete">Eliminar</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            canvas: null,
            ctx: null,
            jugadoresEquipo1: [],
            jugadoresEquipo2: [],
            flechas: [],
            isDragging: false,
            currentElemento: null,
            offsetX: 0,
            offsetY: 0,
            numJugadores: 11,
            isAddingFlecha: false,
            flechaStart: null,
            nombreTactica: '',
            tacticasGuardadas: [],
            usuarioActual: null // Agregamos referencia al usuario actual
        };
    },
    mounted() {
        this.canvas = document.getElementById('tacticaCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Obtenemos el usuario actual del localStorage
        this.usuarioActual = localStorage.getItem('usuario');
        
        this.cargarTacticasUsuario();
        this.inicializarJugadores(1);
        this.inicializarJugadores(2);
        this.draw();
    },
    methods: {
        // Cargar tácticas del usuario actual
        cargarTacticasUsuario() {
            if (!this.usuarioActual) return;
            
            const tacticasUsuarios = JSON.parse(localStorage.getItem('tacticasPorUsuario') || '{}');
            this.tacticasGuardadas = tacticasUsuarios[this.usuarioActual] || [];
        },
        
        // Guardar tácticas asociadas al usuario
        guardarTacticasUsuario() {
            if (!this.usuarioActual) return;
            
            const tacticasUsuarios = JSON.parse(localStorage.getItem('tacticasPorUsuario') || '{}');
            tacticasUsuarios[this.usuarioActual] = this.tacticasGuardadas;
            localStorage.setItem('tacticasPorUsuario', JSON.stringify(tacticasUsuarios));
        },
        
        inicializarJugadores(equipo) {
            const jugadores = equipo === 1 ? this.jugadoresEquipo1 : this.jugadoresEquipo2;
            const color = equipo === 1 ? 'red' : 'blue';

            jugadores.length = 0;

            for (let i = 0; i < this.numJugadores; i++) {
                jugadores.push({
                    x: equipo === 1 ? 200 + (i % 4) * 150 : 800 - (i % 4) * 150,
                    y: 50 + Math.floor(i / 4) * 100,
                    radius: 20,
                    color: color,
                });
            }
        },
        
        guardarTactica() {
            if (!this.usuarioActual) {
                alert('No se ha identificado al usuario actual');
                return;
            }
            
            if (!this.nombreTactica.trim()) {
                alert('Por favor ingresa un nombre para la táctica');
                return;
            }

            const tactica = {
                nombre: this.nombreTactica,
                jugadoresEquipo1: [...this.jugadoresEquipo1],
                jugadoresEquipo2: [...this.jugadoresEquipo2],
                flechas: [...this.flechas],
                fecha: new Date().toLocaleString(),
                usuario: this.usuarioActual // Asociamos la táctica al usuario
            };

            const index = this.tacticasGuardadas.findIndex(t => t.nombre === this.nombreTactica);
            if (index !== -1) {
                if (!confirm(`¿Reemplazar la táctica "${this.nombreTactica}" existente?`)) {
                    return;
                }
                this.tacticasGuardadas[index] = tactica;
            } else {
                this.tacticasGuardadas.push(tactica);
            }

            this.guardarTacticasUsuario();
            this.nombreTactica = '';
            alert('Táctica guardada correctamente');
        },
        
        cargarTactica(index) {
            const tactica = this.tacticasGuardadas[index];
            if (!tactica) return;

            this.jugadoresEquipo1 = tactica.jugadoresEquipo1.map(j => ({ ...j }));
            this.jugadoresEquipo2 = tactica.jugadoresEquipo2.map(j => ({ ...j }));
            this.flechas = tactica.flechas.map(f => ({ ...f }));
            this.draw();
        },
        
        eliminarTactica(index) {
            if (confirm('¿Estás seguro de eliminar esta táctica?')) {
                this.tacticasGuardadas.splice(index, 1);
                this.guardarTacticasUsuario();
            }
        },
        activarAgregarFlecha() {
            this.isAddingFlecha = !this.isAddingFlecha;
        },
        quitarFlecha() {
            this.flechas.pop();
            this.draw();
        },
        handleMouseDown(event) {
            const mousePos = this.getMousePos(event);
            if (this.isAddingFlecha && !this.flechaStart) {
                this.flechaStart = { x: mousePos.x, y: mousePos.y };
            } else if (this.isAddingFlecha && this.flechaStart) {
                this.flechas.push({
                    from: this.flechaStart,
                    to: { x: mousePos.x, y: mousePos.y }
                });
                this.flechaStart = null;
                this.isAddingFlecha = false;
                this.draw();
            } else {
                this.startDragging(event);
            }
        },
        stopDragging() {
            this.isDragging = false;
            this.currentElemento = null;
        },
        startDragging(event) {
            const mousePos = this.getMousePos(event);
            [...this.jugadoresEquipo1, ...this.jugadoresEquipo2].forEach(jugador => {
                if (this.isMouseOverJugador(mousePos, jugador)) {
                    this.isDragging = true;
                    this.currentElemento = jugador;
                    this.offsetX = mousePos.x - jugador.x;
                    this.offsetY = mousePos.y - jugador.y;
                }
            });
        },
        moveElemento(event) {
            if (this.isDragging && this.currentElemento) {
                const mousePos = this.getMousePos(event);
                this.currentElemento.x = mousePos.x - this.offsetX;
                this.currentElemento.y = mousePos.y - this.offsetY;
                this.draw();
            } else if (this.isAddingFlecha && this.flechaStart) {
                this.drawTemporaryFlecha(this.flechaStart, this.getMousePos(event));
            }
        },
        getMousePos(event) {
            const rect = this.canvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        },
        isMouseOverJugador(mousePos, jugador) {
            const dist = Math.sqrt(
                (mousePos.x - jugador.x) ** 2 + (mousePos.y - jugador.y) ** 2
            );
            return dist < jugador.radius;
        },
        draw() {
            // Fondo negro
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Dibujar cancha (opcional)
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(50, 50, this.canvas.width - 100, this.canvas.height - 100);
            this.ctx.beginPath();
            this.ctx.moveTo(this.canvas.width / 2, 50);
            this.ctx.lineTo(this.canvas.width / 2, this.canvas.height - 50);
            this.ctx.stroke();

            // Dibujar jugadores
            this.jugadoresEquipo1.forEach(jugador => {
                this.drawJugador(jugador);
            });
            this.jugadoresEquipo2.forEach(jugador => {
                this.drawJugador(jugador);
            });

            // Dibujar flechas
            this.flechas.forEach(flecha => {
                this.drawFlecha(flecha);
            });
        },
        drawJugador(jugador) {
            this.ctx.fillStyle = jugador.color;
            this.ctx.beginPath();
            this.ctx.arc(jugador.x, jugador.y, jugador.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        },
        drawFlecha(flecha) {
            this.ctx.beginPath();
            this.ctx.moveTo(flecha.from.x, flecha.from.y);
            this.ctx.lineTo(flecha.to.x, flecha.to.y);
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.drawArrowHead(flecha.from, flecha.to);
        },
        drawTemporaryFlecha(from, to) {
            // Redibujar todo
            this.draw();
            
            // Dibujar flecha temporal
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.strokeStyle = 'lightgray';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.drawArrowHead(from, to);
        },
        drawArrowHead(from, to) {
            const headLength = 15;
            const angle = Math.atan2(to.y - from.y, to.x - from.x);
            
            this.ctx.beginPath();
            this.ctx.moveTo(to.x, to.y);
            this.ctx.lineTo(
                to.x - headLength * Math.cos(angle - Math.PI / 6),
                to.y - headLength * Math.sin(angle - Math.PI / 6)
            );
            this.ctx.lineTo(
                to.x - headLength * Math.cos(angle + Math.PI / 6),
                to.y - headLength * Math.sin(angle + Math.PI / 6)
            );
            this.ctx.closePath();
            this.ctx.fillStyle = this.ctx.strokeStyle;
            this.ctx.fill();
        }
    }
};
</script>

<style>
#app {
    background-color: #111;
    min-height: 100vh;
    padding: 20px;
    color: white;
    font-family: Arial, sans-serif;
    margin: -10px;
}

#campo {
    position: relative;
    border: 2px solid green;
    margin: 20px auto;
    display: inline-block;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    background-color: black;
    margin-top: 100px;
    margin-left: 250px;
}

canvas {
    border: 1px solid #444;
    border-radius: 4px;
    background-color: black;
    display: block;
    margin: 0 auto;
}

#panel {
    margin-top: 20px;
    text-align: center;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

.tactica-controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.tactica-list {
    background-color: #222;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
}

.tactica-list ul {
    list-style-type: none;
    padding: 0;
}

.tactica-list li {
    padding: 8px;
    margin: 5px 0;
    background-color: #333;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-tactica {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s, transform 0.3s;
}

.button-tactica:hover {
    background-color: #45a049;
    transform: translateY(-2px);
}

.button-tactica:active {
    transform: translateY(0);
}

.small-button {
    padding: 5px 10px;
    font-size: 14px;
    margin-left: 5px;
    background-color: #555;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.small-button:hover {
    background-color: #666;
}

.small-button.delete {
    background-color: #f44336;
}

.small-button.delete:hover {
    background-color: #d32f2f;
}

.tactica-input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #444;
    background-color: #333;
    color: white;
    min-width: 200px;
}

h3 {
    margin-top: 0;
    color: #4CAF50;
}


@media (min-width: 1336px) and (max-width: 1366px) {
    #campo {
        margin-top: 100px; 
        margin-left: 7.5vw; 
    }
} 
</style>