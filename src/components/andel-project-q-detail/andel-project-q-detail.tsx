import { Component, Host, Prop, h, EventEmitter, Event, State } from '@stencil/core';
import { QuestionnaireApi, Questionnaire, Configuration } from '../../api/ambulance-wl';

@Component({
  tag: 'andel-project-q-detail',
  styleUrl: 'andel-project-q-detail.css',
  shadow: true,
})
export class AndelProjectQDetail {

  @Prop() entryId: string;
  @Prop() ambulanceId: string;
  @Prop() apiBase: string;

  @Event({ eventName: 'editor-closed' }) editorClosed: EventEmitter<string>;
  @State() entry: Questionnaire;
  @State() errorMessage:string;
  @State() isValid: boolean;

  private formElement: HTMLFormElement;

  async componentWillLoad() {
    this.getQuestionnaireEntry();
  }

  private async getQuestionnaireEntry(): Promise<Questionnaire> {
    if(this.entryId === "@new") {
      this.isValid = false;
      this.editing = true;
      this.entry = {
        id: "@new",
        patientId: "",
        name: "",
        questions: Array(8).fill(""),
        lastModified: new Date(Date.now()),
      };
      return this.entry;
    }
    if ( !this.entryId ) {
      this.isValid = false;
      return undefined
    }
    try {
      const configuration = new Configuration({
      basePath: this.apiBase,
      });

      const waitingListApi = new QuestionnaireApi(configuration);

      const response = await waitingListApi.getQuestionnaireEntryRaw({ambulanceId: this.ambulanceId, entryId: this.entryId});

      if (response.raw.status < 299) {
          this.entry = await response.value();
          this.isValid = true;
      } else {
          this.errorMessage = `Cannot retrieve: ${response.raw.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve: ${err.message || "unknown"}`
    }
    return undefined;
  }

  @State() private editing = false;

  private setEditing(value: boolean) {
    this.editing = value;
  }

  render() {
    const disabled = !this.editing;

    if(this.errorMessage) {
      return (
      <Host>
        <div class="error">{this.errorMessage}</div>
      </Host>
      )
    }

    return (
      <Host>
        <form ref={el => this.formElement = el}>
        <md-filled-text-field label="Meno a Priezvisko" disabled={disabled}
            required value={this.entry?.name}
            oninput={ (ev: InputEvent) => {
              if(this.entry) {this.entry.name = this.handleInputEvent(ev)}
            } }>
          <md-icon slot="leading-icon">person</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Registračné číslo pacienta" disabled={disabled}
            required value={this.entry?.patientId}
            oninput={ (ev: InputEvent) => {
              if(this.entry) {this.entry.patientId = this.handleInputEvent(ev)}
            } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

        <md-divider></md-divider>

        <div class="question">Aké lieky pravidelne užívate?</div>
        <md-filled-text-field required
          disabled={disabled}
          value={this.entry?.questions?.[0] ?? ''}
          oninput={(ev: InputEvent) => {
            if (this.entry) this.entry.questions[0] = (ev.target as HTMLInputElement).value;
          }}
        >
          <md-icon slot="leading-icon">medication</md-icon>
        </md-filled-text-field>

        <div class="question">Máte nejaké alergie?</div>
        <md-filled-text-field required
          disabled={disabled}
          value={this.entry?.questions?.[1] ?? ''}
          oninput={(ev: InputEvent) => {
            if (this.entry) this.entry.questions[1] = (ev.target as HTMLInputElement).value;
          }}
        >
          <md-icon slot="leading-icon">healing</md-icon>
        </md-filled-text-field>

        <div class="question">Trpíte na chronické ochorenia (napr. cukrovka, vysoký tlak, astma)?</div>
        <md-filled-text-field required
          disabled={disabled}
          value={this.entry?.questions?.[2] ?? ''}
          oninput={(ev: InputEvent) => {
            if (this.entry) this.entry.questions[2] = (ev.target as HTMLInputElement).value;
          }}
        >
          <md-icon slot="leading-icon">warning</md-icon>
        </md-filled-text-field>

        <div class="question">Vyskytujú sa vo vašej rodine závažné ochorenia (napr. srdcovo-cievne, rakovina)?</div>
        <md-filled-text-field required
          disabled={disabled}
          value={this.entry?.questions?.[3] ?? ''}
          oninput={(ev: InputEvent) => {
            if (this.entry) this.entry.questions[3] = (ev.target as HTMLInputElement).value;
          }}
        >
          <md-icon slot="leading-icon">family_restroom</md-icon>
        </md-filled-text-field>

        <div class="question">Fajčíte alebo ste niekedy fajčili?</div>
        <md-filled-text-field required
          disabled={disabled}
          value={this.entry?.questions?.[4] ?? ''}
          oninput={(ev: InputEvent) => {
            if (this.entry) this.entry.questions[4] = (ev.target as HTMLInputElement).value;
          }}
        >
          <md-icon slot="leading-icon">smoking_rooms</md-icon>
        </md-filled-text-field>

        <div class="question">Konzumujete alkohol? Ak áno, v akom množstve a ako často?</div>
        <md-filled-text-field required
          disabled={disabled}
          value={this.entry?.questions?.[5] ?? ''}
          oninput={(ev: InputEvent) => {
            if (this.entry) this.entry.questions[5] = (ev.target as HTMLInputElement).value;
          }}
        >
          <md-icon slot="leading-icon">local_bar</md-icon>
        </md-filled-text-field>

        <div class="question">Podstupujete momentálne nejakú fyzioterapiu, psychoterapiu alebo inú liečbu?</div>
        <md-filled-text-field required
          disabled={disabled}
          value={this.entry?.questions?.[6] ?? ''}
          oninput={(ev: InputEvent) => {
            if (this.entry) this.entry.questions[6] = (ev.target as HTMLInputElement).value;
          }}
        >
          <md-icon slot="leading-icon">favorite</md-icon>
        </md-filled-text-field>

        <div class="question">Je niečo ďalšie, čo by mohlo byť dôležité vedieť?</div>
        <md-filled-text-field required
          disabled={disabled}
          value={this.entry?.questions?.[7] ?? ''}
          oninput={(ev: InputEvent) => {
            if (this.entry) this.entry.questions[7] = (ev.target as HTMLInputElement).value;
          }}
        >
          <md-icon slot="leading-icon">info</md-icon>
        </md-filled-text-field>

        </form>

        <md-divider></md-divider>

        <div class="actions">
          <md-filled-tonal-button id="delete" disabled={!this.entry || this.entry?.id === "@new" }
            onClick={() => this.deleteEntry()} >
            <md-icon slot="icon">delete</md-icon>
            Zmazať
          </md-filled-tonal-button>

          <span class="stretch-fill"></span>

          {!this.editing && (
            <>
            <md-outlined-button id="back"
                onClick={() => {
                  this.setEditing(false);
                  this.editorClosed.emit('cancel');
                }}>
              Späť
            </md-outlined-button>
            <md-filled-button id="edit" onClick={() => this.setEditing(true)}>
              <md-icon slot="icon">edit</md-icon>
              Upraviť
            </md-filled-button>
            </>
          )}

          {this.editing && (
            <>
              <md-outlined-button
                id="cancel"
                onClick={() => {
                  this.setEditing(false);
                }}
              >
                Zrušiť
              </md-outlined-button>

              <md-filled-button
                id="confirm"
                disabled={ !this.isValid }
                onClick={() => {
                  this.setEditing(false);
                  this.updateEntry()
                }}
              >
                <md-icon slot="icon">save</md-icon>
                Uložiť
              </md-filled-button>
            </>
          )}
        </div>
      </Host>
    );
  }

  private handleInputEvent( ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    this.isValid = true;
    for (let i = 0; i < this.formElement.children.length; i++) {
        const element = this.formElement.children[i]
        if ("reportValidity" in element) {
        const valid = (element as HTMLInputElement).reportValidity();
        this.isValid &&= valid;
        }
    }
    return target.value
  }

  private async updateEntry() {
    try {
      this.entry.lastModified = new Date(Date.now());

      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const waitingListApi = new QuestionnaireApi(configuration);

      const response = this.entryId == "@new" ?
      await waitingListApi.createQuestionnaireEntryRaw({ambulanceId: this.ambulanceId, questionnaire: this.entry}) :
      await waitingListApi.updateQuestionnaireEntryRaw({ambulanceId: this.ambulanceId, entryId: this.entryId, questionnaire: this.entry});

      if (response.raw.status < 299) {
        this.editorClosed.emit("store")
      } else {
        this.errorMessage = `Cannot store entry: ${response.raw.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot store entry: ${err.message || "unknown"}`
    }
  }

  private async deleteEntry() {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const waitingListApi = new QuestionnaireApi(configuration);

      const response = await waitingListApi.deleteQuestionnaireEntryRaw({ambulanceId: this.ambulanceId, entryId: this.entryId});
        if (response.raw.status < 299) {
        this.editorClosed.emit("delete")
        } else {
        this.errorMessage = `Cannot delete entry: ${response.raw.statusText}`
        }
    } catch (err: any) {
        this.errorMessage = `Cannot delete entry: ${err.message || "unknown"}`
    }
  }
}
