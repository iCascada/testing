<?php

namespace App\Models;

use Common\Traits\CamelCasingModelAttributes;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    use CamelCasingModelAttributes;
}
