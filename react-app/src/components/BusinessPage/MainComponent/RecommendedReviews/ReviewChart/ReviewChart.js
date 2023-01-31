import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export const options = {
//     indexAxis: 'y',
//     // position: 'left',
//     elements: {
//         bar: {
//             borderWidth: 2,
//         },
//     },
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'right',
//         },
//         title: {
//             display: true,
//             text: 'Chart.js Horizontal Bar Chart',
//         },
//     },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             borderColor: 'rgb(255, 99, 132)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//         {
//             label: 'Dataset 2',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             borderColor: 'rgb(53, 162, 235)',
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         },
//     ],
// };

function ReviewChart({ id }) {
    const options = {
        indexAxis: 'y',
        // position: 'left',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = ['5 stars', '4 stars', '3 stars', '2 stars', '1 stars'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                 data: [10, 6, 4, 0 ,1],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            // {
            //     label: 'Dataset 2',
            //     data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            //     borderColor: 'rgb(53, 162, 235)',
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
        ],
    };
    return (
        <Bar data={data} options={options} />
    )
}

export default ReviewChart;