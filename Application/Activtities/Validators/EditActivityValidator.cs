using System;
using Application.Activtities.Commands;
using Application.Activtities.DTOs;
using FluentValidation.Validators;
using FluentValidation;

namespace Application.Activtities.Validators;

public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDto>
{
    public EditActivityValidator() : base(x => x.ActivityDto)
    {
        RuleFor(x => x.ActivityDto.Id)
            .NotEmpty().WithMessage("Id is required");

    }


}


