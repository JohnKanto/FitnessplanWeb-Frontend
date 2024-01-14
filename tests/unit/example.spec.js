import { shallowMount } from '@vue/test-utils'
import EditExercise from '@/components/EditExercise.vue';
describe('EditExercise.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(EditExercise);
  });

  it('should initially hide the popup', () => {
    expect(wrapper.find('.popup').exists()).toBe(false);
  });

  it('should display the popup when isVisible is true', async () => {
    await wrapper.setData({ isVisible: true });
    expect(wrapper.find('.popup').exists()).toBe(true);
  });

  it('should update input fields', async () => {
    await wrapper.setData({ isVisible: true });
    await wrapper.vm.$nextTick(); // Warten auf das DOM-Update

    const nameInput = wrapper.find('#Nameinput');
    expect(nameInput.exists()).toBe(true); // Überprüfen, ob das Element existiert

    await nameInput.setValue('New Exercise');
    expect(wrapper.vm.inputName).toBe('New Exercise');
  });

  it('should validate name input on save', async () => {
    await wrapper.setData({ isVisible: true, inputName: '' });
    await wrapper.find('.btn-success').trigger('click');
    expect(wrapper.vm.isNameInputValid).toBe(false);
  });

  it('should call close method on cancel', async () => {
    await wrapper.setData({ isVisible: true });
    await wrapper.find('.btn-danger').trigger('click');
    expect(wrapper.vm.isVisible).toBe(false);
  });

  // Weitere Tests können hier hinzugefügt werden
});


describe('EditExercise.vue - sendDataToApi', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(EditExercise);
  });

  it('should send data to API on save', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ message: 'success' })
    }));

    await wrapper.setData({
      isVisible: true,
      inputName: 'Test Exercise',
      inputSets: 3,
      inputReps: 10,
      inputWeight: 20,
      inputDuration: '00:30:00',
      ID: null,
      Tid: 1
    });

    await wrapper.find('.btn-success').trigger('click');

    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Exercise',
        sets: 3,
        reps: 10,
        weight: 20,
        duration: '00:30:00',
        tid: 1
      })
    }));
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });
});
