import { newE2EPage } from '@stencil/core/testing';

describe('andel-project-q-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<andel-project-q-app></andel-project-q-app>');

    const element = await page.find('andel-project-q-app');
    expect(element).toHaveClass('hydrated');
  });
});
