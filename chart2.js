var ctx = document.getElementById('myChart2').getContext('2d');
var options = { 
    responsive: true,
    maintainAspectRatio: false
  }
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['C++', 'Python', 'Java'],
        datasets: [{
            label: '# of Votes',
            data: [10, 7, 4],
            backgroundColor: [
                'rgba(138,190,238, 1)',
                'rgba(138,172,244, 1)',
                'rgba(149,145,238, 1)',
            ],
            borderColor: [
                'rgb(38, 12, 12, 1)',
                'rgb(38, 12, 12, 1)',
                'rgb(38, 12, 12, 1)',
            ],
            hoverBackgroundColor: [
                'rgba(138,190,238, 0.4)',
                'rgba(138,172,244, 0.4)',
                'rgba(149,145,238, 0.4)',
            ],
            borderWidth: 0.8
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});