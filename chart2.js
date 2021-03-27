var ctx = document.getElementById('myChart2').getContext('2d');
var options = { 
    responsive: true,
    maintainAspectRatio: false
  }
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['C++', 'Python', 'Java', 'C', 'Kotlin'],
        datasets: [{
            label: '# of Votes',
            data: [10, 7, 4, 2, 2],
            backgroundColor: [
                'rgba(243, 101, 41, 1)',
                'rgba(31, 117, 197, 1)',
                'rgba(234, 255, 86, 1)',
                'rgba(152, 102, 255, 1)',
                'rgba(221, 13, 13, 1)',
            ],
            borderColor: [
                'rgb(38, 12, 12, 1)',
                'rgb(38, 12, 12, 1)',
                'rgb(38, 12, 12, 1)',
                'rgb(38, 12, 12, 1)',
                'rgb(38, 12, 12, 1)',
            ],
            hoverBackgroundColor: [
              'rgba(243, 101, 41, 0.4)',
              'rgba(31, 117, 197, 0.4)',
              'rgba(234, 255, 86, 0.4)',
              'rgba(152, 102, 255, 0.4)',
              'rgba(221, 13, 13, 0.4)',
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