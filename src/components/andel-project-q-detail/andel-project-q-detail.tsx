import { Component, Host, Prop, h, EventEmitter, Event, State } from '@stencil/core';

@Component({
  tag: 'andel-project-q-detail',
  styleUrl: 'andel-project-q-detail.css',
  shadow: true,
})
export class AndelProjectQDetail {

  @Prop() entryId: string;

  @Event({ eventName: 'editor-closed' }) editorClosed: EventEmitter<string>;

  /** true ⇒ režim úprav, false ⇒ len na čítanie */
  @State() private editing = false;

  private setEditing(value: boolean) {
    this.editing = value;
  }

  render() {
    const disabled = !this.editing;

    return (
      <Host>
        <md-filled-text-field label="Meno a Priezvisko" disabled={disabled}>
          <md-icon slot="leading-icon">person</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Registračné číslo pacienta" disabled={disabled}>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

        <md-divider></md-divider>

        <div class="question">Aké lieky pravidelne užívate?</div>
        <md-filled-text-field disabled={disabled}>
          <md-icon slot="leading-icon">medication</md-icon>
        </md-filled-text-field>

        <div class="question">Máte nejaké alergie?</div>
        <md-filled-text-field disabled={disabled}>
          <md-icon slot="leading-icon">healing</md-icon>
        </md-filled-text-field>

        <div class="question">
          Trpíte na chronické ochorenia (napr. cukrovka, vysoký tlak, astma)?
        </div>
        <md-filled-text-field disabled={disabled}>
          <md-icon slot="leading-icon">warning</md-icon>
        </md-filled-text-field>

        <div class="question">
          Vyskytujú sa vo vašej rodine závažné ochorenia (napr. srdcovo-cievne, rakovina)?
        </div>
        <md-filled-text-field disabled={disabled}>
          <md-icon slot="leading-icon">family_restroom</md-icon>
        </md-filled-text-field>

        <div class="question">Fajčíte alebo ste niekedy fajčili?</div>
        <md-filled-text-field disabled={disabled}>
          <md-icon slot="leading-icon">smoking_rooms</md-icon>
        </md-filled-text-field>

        <div class="question">
          Konzumujete alkohol? Ak áno, v akom množstve a ako často?
        </div>
        <md-filled-text-field disabled={disabled}>
          <md-icon slot="leading-icon">local_bar</md-icon>
        </md-filled-text-field>

        <div class="question">
          Podstupujete momentálne nejakú fyzioterapiu, psychoterapiu alebo inú liečbu?
        </div>
        <md-filled-text-field disabled={disabled}>
          <md-icon slot="leading-icon">favorite</md-icon>
        </md-filled-text-field>

        <div class="question">Je niečo ďalšie, čo by mohlo byť dôležité vedieť?</div>
        <md-filled-text-field disabled={disabled}>
          <md-icon slot="leading-icon">info</md-icon>
        </md-filled-text-field>

        <md-divider></md-divider>

        <div class="actions">
          <md-filled-tonal-button
            id="delete"
            onClick={() => this.editorClosed.emit('delete')}
          >
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
                onClick={() => {
                  this.setEditing(false);
                  this.editorClosed.emit('store');
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
}
