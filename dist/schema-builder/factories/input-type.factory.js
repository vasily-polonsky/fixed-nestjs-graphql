"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputTypeFactory = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cannot_determine_input_type_error_1 = require("../errors/cannot-determine-input-type.error");
const type_mapper_service_1 = require("../services/type-mapper.service");
const type_definitions_storage_1 = require("../storages/type-definitions.storage");
let InputTypeFactory = exports.InputTypeFactory = class InputTypeFactory {
    constructor(typeDefinitionsStorage, typeMapperService) {
        this.typeDefinitionsStorage = typeDefinitionsStorage;
        this.typeMapperService = typeMapperService;
    }
    create(hostType, typeRef, buildOptions, typeOptions = {}) {
        let inputType = this.typeMapperService.mapToScalarType(typeRef, buildOptions.scalarsMap, buildOptions.dateScalarMode, buildOptions.numberScalarMode);
        if (!inputType) {
            inputType = this.typeDefinitionsStorage.getInputTypeAndExtract(typeRef);
            if (!inputType) {
                throw new cannot_determine_input_type_error_1.CannotDetermineInputTypeError(hostType, typeRef);
            }
        }
        return this.typeMapperService.mapToGqlType(hostType, inputType, typeOptions);
    }
};
exports.InputTypeFactory = InputTypeFactory = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [type_definitions_storage_1.TypeDefinitionsStorage,
        type_mapper_service_1.TypeMapperSevice])
], InputTypeFactory);
