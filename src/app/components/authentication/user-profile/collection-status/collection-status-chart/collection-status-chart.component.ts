import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserGameService } from '../../../../../services/user-game.service';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-collection-status-chart',
  templateUrl: './collection-status-chart.component.html',
  styleUrls: ['./collection-status-chart.component.css']
})
export class CollectionStatusChartComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() games: any[] = [];

  chartType = 'pie' as const;

  chartLabels: string[] = ['Playing', 'Beaten', 'Completed 100%', 'Abandoned'];

  chartData: ChartData<'pie', number[], string> = {
    labels: this.chartLabels,
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545']
      }
    ]
  };

  // Opciones del gráfico
  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  constructor(
    private userGameService: UserGameService,
    private auth: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['games']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    const counts = { playing: 0, beaten: 0, completed: 0, abandoned: 0 };
    
    this.games.forEach(game => {
      switch (game.status) {
        case 'playing': counts.playing++; break;
        case 'beaten': counts.beaten++; break;
        case 'completed': counts.completed++; break;
        case 'abandoned': counts.abandoned++; break;
      }
    });

    this.chartData.datasets[0].data = [
      counts.playing,
      counts.beaten,
      counts.completed,
      counts.abandoned
    ];

    this.chart?.update();
  }
}
