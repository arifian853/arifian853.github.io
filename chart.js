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
                'rgba(251,112,66, 1)',
                'rgba(246,76,59, 1)',
                'rgba(195,40,63, 1)',
                'rgba(134,2,53, 1)',
                'rgba(116,8,56, 1)',
                'rgba(116,8,58, 1)',
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
                'rgba(251,112,66, 0.4)',
                'rgba(246,76,59, 0.4)',
                'rgba(195,40,63, 0.4)',
                'rgba(134,2,53, 0.4)',
                'rgba(116,8,56, 0.4)',
                'rgba(116,8,58, 0.4)',
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
