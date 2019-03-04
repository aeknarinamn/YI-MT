<?php

namespace YellowProject\Subscriber;

use Illuminate\Database\Eloquent\Model;
use YellowProject\SubscriberFolder;
use YellowProject\Subscriber;
use YellowProject\FieldFolder;
use YellowProject\Field;
use YellowProject\FieldItem;

class SBMasterSubscriber extends Model
{
	public static function genMasterSubscriberSB()
    {
        $subscriberFolder = SubscriberFolder::create([
            "name" => "SB Master Subscriber",
            "desc" => "SB Master Subscriber"
        ]);

        $subscriber = Subscriber::create([
            "folder_id" => $subscriberFolder->id,
            "name" => "SB Master Subscriber",
            "desc" => "SB Master Subscriber",
            "is_master" => 1
        ]);

        $fieldFolder = FieldFolder::create([
            "name" => "SB Field Master Subscriber",
            "desc" => "SB Field Master Subscriber"
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "sb_name",
            "type" => "string",
            "description" => "sb_name",
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
            "name" => "sb_email",
            "type" => "email",
            "description" => "sb_email",
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
            "name" => "sb_phone_number",
            "type" => "tel",
            "description" => "sb_phone number",
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
    }
    
    public static function genMasterSubscriberSBData()
    {
        $subscriberFolder = SubscriberFolder::create([
            "name" => "SB Master Subscriber Customer",
            "desc" => "SB Master Subscriber Customer"
        ]);

        $subscriber = Subscriber::create([
            "folder_id" => $subscriberFolder->id,
            "name" => "SB Master Subscriber Customer",
            "desc" => "SB Master Subscriber Customer",
            "is_master" => 1
        ]);

        $fieldFolder = FieldFolder::create([
            "name" => "SB Field Master Subscriber Customer",
            "desc" => "SB Field Master Subscriber Customer"
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "CUSTOMER_ID",
            "type" => "string",
            "description" => "รหัส Customer",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "CUSTOMER_ID",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "SHIPPING_ADDRESS_ID",
            "type" => "integer",
            "description" => "รหัส ที่อยู่จัดส่ง",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "SHIPPING_ADDRESS_ID",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "BILLING_ADDRESS_ID",
            "type" => "integer",
            "description" => "รหัส ที่อยู่ใบกำกับภาษี",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "BILLING_ADDRESS_ID",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "TITLE",
            "type" => "string",
            "description" => "รหัส คำนำหน้า",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "TITLE",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "FIRST_NAME",
            "type" => "string",
            "description" => "ชื่อลูกค้า",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "FIRST_NAME",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "LAST_NAME",
            "type" => "string",
            "description" => "นามสกุลลูกค้า",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "LAST_NAME",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "EMAIL",
            "type" => "email",
            "description" => "Email",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "EMAIL",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "IS_DESIGNER",
            "type" => "boolean",
            "description" => "ลูกค้าประเภท Designer",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "IS_DESIGNER",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "PASSWORD",
            "type" => "string",
            "description" => "รหัสผ่านเข้า Website",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "PASSWORD",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "BPCODE",
            "type" => "string",
            "description" => "รหัสลูกค้า",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "BPCODE",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_MOBILE_PHONE1",
            "type" => "tel",
            "description" => "เบอร์โทรศัพท์มือถือ 1",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_MOBILE_PHONE1",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_MOBILE_PHONE2",
            "type" => "tel",
            "description" => "เบอร์โทรศัพท์มือถือ 2",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_MOBILE_PHONE2",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "PROFILE_IMAGE_URL",
            "type" => "string",
            "description" => "URL รูปลูกค้า",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "PROFILE_IMAGE_URL",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "PROFILE_IMAGE_PATH",
            "type" => "string",
            "description" => "path เก็บรูปลูกค้า",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "PROFILE_IMAGE_PATH",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "POINT_EARNED",
            "type" => "integer",
            "description" => "คะแนนที่ได้รับ",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "POINT_EARNED",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "POINT_CONSUMED",
            "type" => "integer",
            "description" => "คะแนนที่ใช้ไป",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "POINT_CONSUMED",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "POINT_BALANCE",
            "type" => "integer",
            "description" => "คะแนนคงเหลือ",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "POINT_BALANCE",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "POINT_EXPIRED",
            "type" => "integer",
            "description" => "คะแนนที่หมดอายุ",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "POINT_EXPIRED",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ACC_THIS_YEAR",
            "type" => "integer",
            "description" => "ปีที่เป็นสมาชิก",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ACC_THIS_YEAR",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "POINT_LAST_YEAR",
            "type" => "integer",
            "description" => "คะแนนปีที่แล้ว",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "POINT_LAST_YEAR",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "INC_EXPIRE_DATE",
            "type" => "date",
            "description" => "วันที่ที่คะแนนกำลังจะหมดอายุ",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "INC_EXPIRE_DATE",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "INC_EXPIRE_POINT",
            "type" => "integer",
            "description" => "คะแนนที่กำลังจะหมดอายุ",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "INC_EXPIRE_POINT",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_NO",
            "type" => "string",
            "description" => "บ้านเลขที่",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_NO",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_POSTAL_CODE",
            "type" => "integer",
            "description" => "รหัสไปรษณีย์",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_POSTAL_CODE",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_PROVINCE_ID",
            "type" => "integer",
            "description" => "รหัสจังหวัด",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_PROVINCE_ID",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_PROVINCE",
            "type" => "string",
            "description" => "จังหวัด",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_PROVINCE",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_STREET",
            "type" => "string",
            "description" => "ชื่อถนน",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_STREET",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_DISTRICT_ID",
            "type" => "integer",
            "description" => "รหัสอำเภอ",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_DISTRICT_ID",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_DISTRICT",
            "type" => "string",
            "description" => "อำเภอ",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_DISTRICT",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_SUB_DISTRICT_ID",
            "type" => "integer",
            "description" => "รหัสตำบล",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_SUB_DISTRICT_ID",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_SUB_DISTRICT",
            "type" => "string",
            "description" => "ตำบล",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_SUB_DISTRICT",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_TELEPHONE",
            "type" => "string",
            "description" => "หมายเลขโทรศัพท์บ้าน",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_TELEPHONE",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_TYPE",
            "type" => "string",
            "description" => "ประเภทที่อยู่",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_TYPE",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "FORMLANG",
            "type" => "string",
            "description" => "รูปแบบภาษา",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "FORMLANG",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_BUILDING",
            "type" => "string",
            "description" => "ชื่ออาคาร",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_BUILDING",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "ADDRESS_OFFICE_NAME",
            "type" => "string",
            "description" => "ชื่อสำนักงาน",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "ADDRESS_OFFICE_NAME",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "DATE_OF_BIRTH",
            "type" => "date",
            "description" => "วันเกิด DD-MM-YYYY",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "DATE_OF_BIRTH",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "DATE_OF_BIRTH",
            "type" => "date",
            "description" => "วันเกิด DD-MM-YYYY",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "DATE_OF_BIRTH",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "NATIONALITY",
            "type" => "string",
            "description" => "สัญชาติ",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "NATIONALITY",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "FG_PW_HASH",
            "type" => "string",
            "description" => "รหัสที่ขอตอนลืมรหัสผ่าน",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "FG_PW_HASH",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "FG_PW_EXP_DATE",
            "type" => "date",
            "description" => "วันที่ขอรหัสเมื่อลืมรหัสผ่าน",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "FG_PW_EXP_DATE",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "CREATE19_DATE",
            "type" => "date",
            "description" => "วันที่เป็น prospect หรือ 19",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "CREATE19_DATE",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);

        $field = Field::create([
            "folder_id" => $fieldFolder->id,
            "name" => "CREATE11_DATE",
            "type" => "date",
            "description" => "วันที่เป็น member",
            "is_personalize" => 0,
            "primary_key" => 0,
            "is_segment" => 0,
            "subscriber_id" => $subscriber->id,
            "field_name" => "CREATE11_DATE",
            "personalize_default" => null,
            "api_url" => null,
            "is_required" => 0,
            "is_readonly" => 0,
            "is_api" => 0,
            "is_encrypt" => 0,
        ]);
    }
}
