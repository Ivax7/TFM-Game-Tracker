import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserGameService } from '../../../../../services/user-game.service';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ratingCounts: number[] = [0, 0, 0, 0, 0];
  totalRatedGames = 0;

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        suggestedMax: 5
      }
    }
  };

  chartLabels = ['1 ⭐', '2 ⭐', '3 ⭐', '4 ⭐', '5 ⭐'];
  chartData: any = {
    labels: this.chartLabels,
    datasets: [
      {
        label: 'Number of games',
        data: this.ratingCounts,
        backgroundColor: ['#FF4C4C','#FF914C','#FFD64C','#A6FF4C','#4CFF88'],
      }
    ]
  };

  constructor(
    private userGameService: UserGameService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.userGameService.getGamesByUser(userId).subscribe(games => {
      // Cuantos juegos tienen tantas estrellas
      this.ratingCounts = [0, 0, 0, 0, 0];

      games.forEach(game => {
        if (game.rating && game.rating >= 1 && game.rating <= 5) {
          this.ratingCounts[game.rating - 1] += 1;
        }
      });

      this.totalRatedGames = this.ratingCounts.reduce((a, b) => a + b, 0);

      const maxY = Math.max(...this.ratingCounts);

      // actualizar suggestedMax dinámicamente
      if (this.chartOptions.scales) {
        this.chartOptions.scales['y'] = {
          ...this.chartOptions.scales['y'],
          suggestedMax: maxY
        };
      }

      // actualizar los datos del chart
      this.chartData.datasets[0].data = [...this.ratingCounts];

      // actualizar el gráfico
      this.chart?.update();
    });
  }
}
