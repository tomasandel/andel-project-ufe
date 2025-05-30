import { Component, Host, h } from '@stencil/core';
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/icon/icon'

@Component({
  tag: 'andel-project-q-list',
  styleUrl: 'andel-project-q-list.css',
  shadow: true,
})
export class AndelProjectQList {
  waitingPatients: any[];

  private async getWaitingPatientsAsync(){
    return await Promise.resolve(
      [{
          name: 'Jožko Púčik',
          patientId: '10001',
          lastModified: new Date(Date.now()),
          questions: [
            { questionId: '1', answer: 'Áno' },
            { questionId: '2', answer: 'Nie' },
            { questionId: '3', answer: 'Áno' },
          ]
      }, {
          name: 'Bc. August Cézar',
          patientId: '10096',
          lastModified: new Date(Date.now()),
          questions: [
            { questionId: '1', answer: 'Áno' },
            { questionId: '2', answer: 'Nie' },
            { questionId: '3', answer: 'Áno' },
          ]
      }, {
          name: 'Ing. Ferdinand Trety',
          patientId: '10028',
          lastModified: new Date(Date.now()),
          questions: [
            { questionId: '1', answer: 'Áno' },
            { questionId: '2', answer: 'Nie' },
            { questionId: '3', answer: 'Áno' },
          ]
      }]
    );
  }

  async componentWillLoad() {
    this.waitingPatients = await this.getWaitingPatientsAsync();
  }

  render() {
    return (
      <Host>
        <md-list>
          {this.waitingPatients.map(patient =>
            <md-list-item>
              <div slot="headline">{patient.name}</div>
              <div slot="supporting-text">{"Dátum úpravy: " + patient.lastModified?.toLocaleString()}</div>
                <md-icon slot="start">person</md-icon>
            </md-list-item>
          )}
        </md-list>
      </Host>
    );
  }
}
