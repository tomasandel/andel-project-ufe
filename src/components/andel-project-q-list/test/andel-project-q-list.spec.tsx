import { newSpecPage } from '@stencil/core/testing';
import { AndelProjectQList } from '../andel-project-q-list';

describe('andel-project-q-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AndelProjectQList],
      html: `<andel-project-q-list></andel-project-q-list>`,
    });
    expect(page.root).toEqualHtml(`
      <andel-project-q-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </andel-project-q-list>
    `);
  });
});
