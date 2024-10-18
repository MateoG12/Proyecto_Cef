<template>
    <div id="app">
        <div id="campo">
            <canvas
                id="tacticaCanvas"
                width="800"
                height="600"
                @mousedown="handleMouseDown"
                @mouseup="stopDragging"
                @mousemove="moveElemento"
                @click="handleCanvasClick"
            ></canvas>
        </div>
        <div id="panel">
            <button class="button-tactica " @click="activarAgregarFlecha">Agregar Flecha</button>
            <button class="button-tactica " @click="quitarFlecha">Borrar Flecha</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            canvas: null,
            ctx: null,
            jugadores: [],
            flechas: [],
            isDragging: false,
            currentElemento: null,
            offsetX: 0,
            offsetY: 0,
            numJugadores: 11,
            isAddingFlecha: false,
            flechaStart: null,
        };
    },
    mounted() {
        this.canvas = document.getElementById('tacticaCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.cargarJugadores();
        this.draw();
    },
    methods: {
        cargarJugadores() {
            const storedJugadores = JSON.parse(localStorage.getItem('jugadores'));
            if (storedJugadores) {
                this.jugadores = storedJugadores;
            } else {
                this.inicializarJugadores();
            }
        },
        inicializarJugadores() {
            for (let i = 0; i < this.numJugadores; i++) {
                this.jugadores.push({
                    x: Math.random() * (this.canvas.width - 40) + 20,
                    y: Math.random() * (this.canvas.height - 40) + 20,
                    radius: 20,
                    color: i < 11 ? 'red' : 'blue',
                });
            }
            this.guardarJugadores();
        },
        guardarJugadores() {
            localStorage.setItem('jugadores', JSON.stringify(this.jugadores));
        },
        activarAgregarFlecha() {
            this.isAddingFlecha = !this.isAddingFlecha; // Alternar estado de agregar flecha
        },
        quitarFlecha() {
            this.flechas.pop(); // Elimina la última flecha
            this.draw(); // Redibuja el lienzo
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
                this.flechaStart = null; // Reinicia el inicio de la flecha
                this.isAddingFlecha = false; // Desactiva el modo de agregar flecha
                this.draw();
            } else {
                this.startDragging(event);
            }
        },
        stopDragging() {
            this.isDragging = false;
            this.currentElemento = null;
            this.guardarJugadores(); // Guarda posiciones al dejar de arrastrar
        },
        startDragging(event) {
            const mousePos = this.getMousePos(event);
            this.jugadores.forEach(jugador => {
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
                this.drawTemporaryFlecha(this.flechaStart, { x: event.clientX, y: event.clientY });
            }
        },
        handleCanvasClick(event) {
            // No se requiere manejar el clic para editar, simplemente se deja vacío
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
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Dibujar jugadores
            this.jugadores.forEach(jugador => {
                this.ctx.fillStyle = jugador.color;
                this.ctx.beginPath();
                this.ctx.arc(jugador.x, jugador.y, jugador.radius, 0, Math.PI * 2);
                this.ctx.fill();
            });

            // Dibujar flechas
            this.flechas.forEach(flecha => {
                this.ctx.beginPath();
                this.ctx.moveTo(flecha.from.x, flecha.from.y);
                this.ctx.lineTo(flecha.to.x, flecha.to.y);
                this.ctx.strokeStyle = 'black';
                this.ctx.stroke();
            });
        },
        drawTemporaryFlecha(from, to) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw(); // Redibuja jugadores y flechas existentes
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.strokeStyle = 'lightgray'; // Color de la flecha temporal
            this.ctx.stroke();
        }
    }
};
</script>

<style>
#campo {
    position: relative;
    border: 2px solid green;
    margin-top: 200px;
    margin-left: 500px;
    display: inline-block;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    background-color: #f9f9f9;
}
canvas {
    border: 1px solid #ccc; /* Borde del canvas */
    border-radius: 4px;
    background-color: #eaeaea; /* Color de fondo del canvas */
}
#panel {
    margin-top: 10px;
    text-align: center; 
}

.button-tactica {
    background-color: #4CAF50; /* Color de fondo */
    border: none;
    color: white; /* Color del texto */
    padding: 10px 15px; /* Espaciado */
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px; /* Tamaño de fuente */
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px; /* Bordes redondeados */
    transition: background-color 0.3s, transform 0.3s; /* Transiciones suaves */
}

.button-tactica :hover {
    background-color: #45a049; /* Color al pasar el ratón */
    transform: translateY(-2px); /* Levantar el botón */
}

.button-tactica :active {
    transform: translateY(0); /* Volver a la posición original al hacer clic */
}

</style>