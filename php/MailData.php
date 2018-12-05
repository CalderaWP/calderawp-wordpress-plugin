<?php


namespace calderawp\WordPressPlugin;


class MailData extends \Caldera_Forms_Email_Resend
{


	protected $mailerData;

	public function getEmailData(){
			$this->add_magic_hooks();
			$this->apply_conditional_recipients();
			$form = $this->form;
			$this->remove_magic_hooks();
			$this->form[ 'mailer' ][ 'recipients' ] = \Caldera_Forms::do_magic_tags($this->form[ 'mailer' ][ 'recipients' ],
				$this->entry_id, $this->data);
			$this->add_magic_hooks();
			add_filter('caldera_forms_mailer', function ($mail, $data, $form, $entryid) {
				$this->mailerData = $mail;
				return null;
			}, 10, 4);
			\Caldera_Forms_Save_Final::do_mailer($this->form, $this->entry_id, $this->get_data());
		
		return $this->mailerData;



	}
	public function resend()
	{
		throw new Exception('Do not use' );
	}

}