<?php

namespace YellowProject\Subscriber;

use Illuminate\Database\Eloquent\Model;
use YellowProject\SubscriberFolder;
use YellowProject\Subscriber;
use YellowProject\FieldFolder;
use YellowProject\Field;
use YellowProject\FieldItem;

class MasterSubscriber extends Model
{
    public static function genMasterSubscriber()
    {
    	$subscriberFolder = SubscriberFolder::create([
    		"name" => "Master Subscriber",
    		"desc" => "Master Subscriber"
    	]);

    	$subscriber = Subscriber::create([
    		"folder_id" => $subscriberFolder->id,
    		"name" => "Master Subscriber",
    		"desc" => "Master Subscriber",
            "is_master" => 1
    	]);

    	$fieldFolder = FieldFolder::create([
    		"name" => "Field Master Subscriber",
    		"desc" => "Field Master Subscriber"
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "name",
    		"type" => "string",
    		"description" => "name",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "ชื่อ",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "last_name",
    		"type" => "string",
    		"description" => "Last Name",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "นามสกุล",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "age",
    		"type" => "integer",
    		"description" => "Age",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "อายุ",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "email",
    		"type" => "email",
    		"description" => "Email",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "อีเมล",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "tel",
    		"type" => "tel",
    		"description" => "Tel",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "เบอร์โทร",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "birth_date",
    		"type" => "date",
    		"description" => "Birth Date",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "วัน/เดือน/ปี เกิด",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "gender",
    		"type" => "enum_radio",
    		"description" => "Gender",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "เพศ",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	FieldItem::create([
    		"dim_fields_id" => $field->id,
    		"value" => "ชาย",
    	]);

    	FieldItem::create([
    		"dim_fields_id" => $field->id,
    		"value" => "หญิง",
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "citizen_number",
    		"type" => "string",
    		"description" => "Citizen Number",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "เลขบัตรประชาชน",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "address",
    		"type" => "text",
    		"description" => "Address",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "ที่อยู่",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "job",
    		"type" => "string",
    		"description" => "Job",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "อาชีพ",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "salary",
    		"type" => "decimal",
    		"description" => "Salary",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "เงินเดือน",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	$field = Field::create([
    		"folder_id" => $fieldFolder->id,
    		"name" => "marital_status",
    		"type" => "enum_radio",
    		"description" => "Marital status",
    		"is_personalize" => 0,
    		"primary_key" => 0,
    		"is_segment" => 0,
    		"subscriber_id" => $subscriber->id,
    		"field_name" => "สถานภาพ",
    		"personalize_default" => null,
    		"api_url" => null,
    		"is_required" => 0,
    		"is_readonly" => 0,
    		"is_api" => 0,
    		"is_encrypt" => 0,
    	]);

    	FieldItem::create([
    		"dim_fields_id" => $field->id,
    		"value" => "โสด - single",
    	]);

    	FieldItem::create([
    		"dim_fields_id" => $field->id,
    		"value" => "แต่งงาน - family",
    	]);
    }

    public static function genMasterSubscriberLH()
    {
        $subscriberFolder = SubscriberFolder::create([
            "name" => "Master Subscriber LH",
            "desc" => "Master Subscriber LH"
        ]);

        $subscriber = Subscriber::create([
            "folder_id" => $subscriberFolder->id,
            "name" => "Master Subscriber LH",
            "desc" => "Master Subscriber LH",
            "is_master" => 1
        ]);

        $fieldFolder = FieldFolder::create([
            "name" => "Field Master Subscriber LH",
            "desc" => "Field Master Subscriber LH"
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "lh_name",
            "type" => "string",
            "description" => "name",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ชื่อ",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "lh_last_name",
            "type" => "string",
            "description" => "Last Name",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "นามสกุล",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "lh_email",
            "type" => "email",
            "description" => "Email",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "อีเมล",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "lh_tel",
            "type" => "tel",
            "description" => "Tel",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "เบอร์โทร",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "residential_type",
            "type" => "string",
            "description" => "Residential Type",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ประเภทที่อยู่อาศัย",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "interesting_place",
            "type" => "string",
            "description" => "Interesting Place",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ทำเลที่คุณสนใจ",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "interesting_project",
            "type" => "string",
            "description" => "Interesting Project",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "โครงการที่น่าสนใจ",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "purchase_budget",
            "type" => "string",
            "description" => "Purchase Budget",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "งบประมาณในการซื้อ",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "plan_buy",
            "type" => "string",
            "description" => "Plan Buy",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "แผนจะซื้อในเดือนไหน",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

    }
}
