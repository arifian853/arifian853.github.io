var ctx = document.getElementById('myChart').getContext('2d');
var options = { 
  responsive: true,
  maintainAspectRatio: false
}
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['HTML', 'CSS', 'JavaScript', 'PHP', 'AngularJS', 'VueJS'],
        datasets: [{
            label: '# of Votes',
            data: [22, 17, 11, 2, 2, 2],
            backgroundColor: [
                'rgba(241, 101, 41, 1)',
                'rgba(37, 117, 197, 1)',
                'rgba(240, 255, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(246, 13, 13, 1)',
                'rgba(9, 239, 186, 1)',
            ],
            borderColor: [
                'rgb(38, 12, 12, 1)',
                'rgb(38, 12, 12, 1)',
                'rgb(38, 12, 12, 1)',
                'rgb(38, 12, 12, 1)',
                'rgb(38, 12, 12, 1)',
                'rgb(38, 12, 12, 1)',
            ],
            hoverBackgroundColor: [
              'rgba(241, 101, 41, 0.4)',
              'rgba(37, 117, 197, 0.4)',
              'rgba(240, 255, 86, 0.4)',
              'rgba(153, 102, 255, 0.4)',
              'rgba(246, 13, 13, 0.4)',
              'rgba(9, 239, 186, 0.4)',
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