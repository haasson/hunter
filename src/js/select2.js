//  SELECT2 (раскрывающийся список)
import $ from "jquery";

export default function initSelect() {
   $('.select2').select2({
      minimumResultsForSearch: Infinity,
      containerCssClass: 'custom-select',
      dropdownCssClass: 'custom-dropdown',
   })
}
