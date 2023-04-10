const mongoose = require('mongoose')

const evaluationSchema = new mongoose.Schema({
    school_year: {
        type: String
    },
    status: {
        type: String,
        enum: {
            values: ['Active', 'Not Active'],
            message: 'There is error on proccessing this input for Evaluation Model "status" Element'
        }
    },
    ia: {
        type: Boolean,
    },
    dv: {
        type: Date,
        require: true
    },
    tr: {
        type: String,
        require: true,
        enum: {
            values: ['Student'],
            message: 'There is error on proccessing this input for Evaluation Model "tr" Element'
        },
        default: 'Student'
    },
    yl: {
        first_year: {
            type: Number,
            required: true,
            default: 0,
        },
        second_year: {
            type: Number,
            required: true,
            default: 0,
        },
        third_year: {
            type: Number,
            required: true,
            default: 0,
        },
        fourth_year: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    course: {
        BETAT: {
            type: Number,
            required: true,
            default: 0,
        },
        BETChT: {
            type: Number,
            required: true,
            default: 0,
        },
        BETCT: {
            type: Number,
            required: true,
            default: 0,
        },
        BETET: {
            type: Number,
            required: true,
            default: 0,
        },
        BETEMT: {
            type: Number,
            required: true,
            default: 0,
        },
        BETElxT: {
            type: Number,
            required: true,
            default: 0,
        },
        BETInCT: {
            type: Number,
            required: true,
            default: 0,
        },
        BETMT: {
            type: Number,
            required: true,
            default: 0,
        },
        BETMecT: {
            type: Number,
            required: true,
            default: 0,
        },
        BETNDTT: {
            type: Number,
            required: true,
            default: 0,
        },
        BETDMT: {
            type: Number,
            required: true,
            default: 0,
        },
        BETHVACRT: {
            type: Number,
            required: true,
            default: 0,
        },
        BSCESEP: {
            type: Number,
            required: true,
            default: 0,
        },
        BSEESEP: {
            type: Number,
            required: true,
            default: 0,
        },
        BSECESEP: {
            type: Number,
            required: true,
            default: 0,
        },
        BSMESEP: {
            type: Number,
            required: true,
            default: 0,
        },
        BSIT: {
            type: Number,
            required: true,
            default: 0,
        },
        BSIS: {
            type: Number,
            required: true,
            default: 0,
        },
        BSESSDP: {
            type: Number,
            required: true,
            default: 0,
        },
        BGTAT: {
            type: Number,
            required: true,
            default: 0,
        },
        BTVTEdET: {
            type: Number,
            required: true,
            default: 0,
        },
        BTVTEdLXt: {
            type: Number,
            required: true,
            default: 0,
        },
        BTVTEdICT: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    gender: {
        male: {
            type: Number,
            required: true,
            default: 0,
        },
        female: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    sra: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            required: true,
            default: 0,
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    lav: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            required: true,
            default: 0,
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    clean: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            required: true,
            default: 0,
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    ho: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            required: true,
            default: 0,
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    brb: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            required: true,
            default: 0,
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    opac: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            required: true,
            default: 0,
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    bc: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            required: true,
            default: 0,
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    pc: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    tps: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            required: true,
            default: 0,
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    er: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            required: true,
            default: 0,
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    skaq: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            required: true,
            default: 0,
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    css: {
        excellent: {
            type: Number,
            required: true,
            default: 0,
        },
        good: {
            type: Number,
            required: true,
            default: 0,
        },
        average: {
            type: Number,
            required: true,
            default: 0,
        },
        poor: {
            type: Number,
            required: true,
            default: 0,
        },
        very_poor: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    respondents: {
        type: Number,
        default: 0,
    },
    comments: [{
        type: String,
    }]

})
module.exports = mongoose.model('Evaluation', evaluationSchema);