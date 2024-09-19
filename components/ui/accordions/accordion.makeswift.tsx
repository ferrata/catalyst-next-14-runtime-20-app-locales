// import { List, Select, Shape, Slot, TextInput } from '@makeswift/runtime/controls';

// import { runtime } from '~/lib/makeswift/runtime';

// import { Accordions } from './accordions';

// runtime.registerComponent(Accordions, {
//   type: 'catalyst-accordion',
//   label: 'Catalyst / Accordion',
//   props: {
//     accordions: List({
//       label: 'Accordions',
//       type: Shape({
//         type: {
//           content: Slot(),
//           value: TextInput({
//             label: 'Value',
//             defaultValue: 'Lorem Ipsum?',
//             // placeholder: 'Unique value',
//           }),
//         },
//       }),
//       getItemLabel() {
//         return 'Slot';
//       },
//     }),
//     type: Select({
//       label: 'Type',
//       options: [
//         { label: 'Single', value: 'single' },
//         { label: 'Multiple', value: 'multiple' },
//       ],
//       defaultValue: 'single',
//     }),
//   },
// });
