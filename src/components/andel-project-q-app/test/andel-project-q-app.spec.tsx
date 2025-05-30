import { newSpecPage } from '@stencil/core/testing';
import { AndelProjectQApp } from '../andel-project-q-app';

describe('andel-project-q-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AndelProjectQApp],
      html: `<andel-project-q-app></andel-project-q-app>`,
    });
    expect(page.root).toEqualHtml(`
      <andel-project-q-app>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </andel-project-q-app>
    `);
  });
});
