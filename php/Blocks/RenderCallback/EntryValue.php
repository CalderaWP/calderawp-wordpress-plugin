<?php


namespace calderawp\WordPressPlugin\Blocks\RenderCallback;


class EntryValue implements RenderCallbackContract
{

	protected  $atts;

	const DEFULAT_ATTS_FILTER = 'calderawp/WordPressPlugin/Blocks/RenderCallback/EntryValue/getArgs';
	protected  function parseAtts($atts)
	{
		$this->atts = array_merge($this->getDefaultAtts(), $atts);
		$this->atts = $this->getAtts();
	}

	protected  function entryId()
	{
		return $this->atts[ 'entryId' ];
	}

	protected  function formId()
	{
		return $this->atts[ 'formId' ];
	}

	protected  function fieldId()
	{
		return $this->atts[ 'fieldId' ];
	}

	protected  function after()
	{
		return $this->atts[ 'after' ] . '</li>';
	}
	protected  function before()
	{
		return '<li>' . $this->atts[ 'before' ];
	}

	public function getAtts()
	{

		return apply_filters( self::DEFULAT_ATTS_FILTER, ! empty($this->atts) ? $this->atts : $this->getDefaultAtts() );
	}

	public function render(array $atts)
	{
		$this->parseAtts($atts);

		$form = \Caldera_Forms_Forms::get_form($this->formId());
		$entry = new \Caldera_Forms_Entry($form, $this->entryId());

		$field = $entry->get_field($this->fieldId() );
		$fieldConfig = \Caldera_Forms_Field_Util::get_field($this->fieldId(),$form);
		if( $field ){
			$value = $field->get_value();
			return $this->before() . apply_filters('caldera_forms_view_field_' . $fieldConfig['type'], $value, $fieldConfig, $form) . $this->after();
		}

	}

	/**
	 * @return array
	 */
	protected function getDefaultAtts(): array
	{
		return [
			'entryId' => 0,
			'fieldId' => '',
			'formId' => '',
			'before' => '',
			'after' => ''
		];
	}

}