<?php


namespace calderawp\WordPressPlugin\Blocks\RenderCallback;


class EntryValue implements RenderCallbackContract
{

	protected  $args;

	protected  function parseArgs($atts)
	{
		$this->args = array_merge([
			'entryId' => 0,
			'fieldId' => '',
			'formId' => '',
			'before' => '',
			'after' => ''
		], $atts);
	}

	protected  function entryId()
	{
		return $this->args[ 'entryId' ];
	}

	protected  function formId()
	{
		return $this->args[ 'formId' ];
	}

	protected  function fieldId()
	{
		return $this->args[ 'fieldId' ];
	}

	protected  function after()
	{
		return $this->args[ 'after' ] . '</li>';
	}
	protected  function before()
	{
		return '<li>' . $this->args[ 'before' ];
	}


	public function render(array $atts)
	{
		$this->parseArgs($atts);

		$form = \Caldera_Forms_Forms::get_form($this->formId());
		$entry = new \Caldera_Forms_Entry($form, $this->entryId());
		$field = $entry->get_field($this->fieldId() );
		$fieldConfig = \Caldera_Forms_Field_Util::get_field($this->fieldId(),$form);
		if( $field ){
			$value = $field->get_value();

			return $this->before() . apply_filters('caldera_forms_view_field_' . $fieldConfig['type'], $value, $fieldConfig, $form) . $this->after();
		}

	}
}