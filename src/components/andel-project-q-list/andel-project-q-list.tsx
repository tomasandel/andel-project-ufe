import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { QuestionnaireApi, Questionnaire, Configuration } from '../../api/ambulance-wl';

@Component({
  tag: 'andel-project-q-list',
  styleUrl: 'andel-project-q-list.css',
  shadow: true,
})
export class AndelProjectQList {
  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<string>;

  @Prop() apiBase: string;
  @Prop() ambulanceId: string;
  @State() errorMessage: string;

  questionnaires: Questionnaire[];

  private async getQuestionnairesAsync(): Promise<Questionnaire[]> {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const questionnaireApi = new QuestionnaireApi(configuration);
      const response = await questionnaireApi.getQuestionnaireEntriesRaw({ambulanceId: this.ambulanceId})
      if (response.raw.status < 299) {
        return await response.value();
      } else {
        this.errorMessage = `Cannot retrieve questionnaires: ${response.raw.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve questionnaires: ${err.message || "unknown"}`
    }
    return [];
  }

  async componentWillLoad() {
    this.questionnaires = await this.getQuestionnairesAsync();
  }

  render() {
    return (
      <Host>
        {this.errorMessage
        ? <div class="error">error: {this.errorMessage}</div>
        :
        <md-list>
            {this.questionnaires.map((patient) =>
            <md-list-item onClick={ () => this.entryClicked.emit(patient.id)}>
              <div slot="headline">{patient.name}</div>
              <div slot="supporting-text">{"Dátum úpravy: " + patient.lastModified?.toLocaleString()}</div>
                <md-icon slot="start">person</md-icon>
            </md-list-item>
          )}
        </md-list>
      }
        <md-filled-icon-button class="add-button"
          onclick={() => this.entryClicked.emit("@new")}>
          <md-icon>add</md-icon>
        </md-filled-icon-button>
      </Host>
    );
  }
}
