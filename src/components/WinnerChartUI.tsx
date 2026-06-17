import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";


interface WinnerChartUIProps {
    data: { name: string; value: number }[];
}

const COLORS = ["#D4AF37", "#555555", "#C9C9C9"];
export default function WinnerChartUI({ data }: WinnerChartUIProps) {
    return (
        <PieChart width={350} height={300}>
            <Pie                        // grafico circular para mostrar la distribucion de victorias entre blancas, negras y empates
                data={data}             // se le pasa el arreglo de datos con el nombre y valor de cada categoria
                dataKey="value"         // se le indica que el valor a graficar es el campo "value" de cada objeto
                nameKey="name"          // se le indica que el nombre de cada categoria es el campo "name" de cada objeto
                cx="50%"                // se le indica que el centro del grafico esta en el 50% del ancho del contenedor
                cy="50%"                // se le indica que el centro del grafico esta en el 50% de la altura del contenedor
                outerRadius={90}        // se le indica que el radio exterior del grafico es de 90 pixeles
                label                   // se le indica que se muestren las etiquetas con el nombre de cada categoria
            >

                {/* se recorre cada elemento del arreglo
                por cada elemento de data, indez se le asigna un color, 0- blancas, 1- negras, 2- empates */}
                {data.map((_, index) => (
                    <Cell
                        key={index}
                        fill={COLORS[index]}
                    />
                ))}
            </Pie>
            <Tooltip />   {/* se le indica que se muestre una tooltip al pasar el mouse por encima de cada sector del grafico */}
            <Legend />    {/* se le indica que se muestre una leyenda con el nombre de cada categoria y su color */}
        </PieChart>
    );
}

/**
 * Se instalo npm install recharts para que se pueda usar el componente de grafico circular
 * 
 */