import { newE2EPage } from '@stencil/core/testing';

describe('andel-project-q-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<andel-project-q-list></andel-project-q-list>');

    const element = await page.find('andel-project-q-list');
    expect(element).toHaveClass('hydrated');
  });
});
